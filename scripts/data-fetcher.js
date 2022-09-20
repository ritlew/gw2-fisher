/* eslint @typescript-eslint/no-var-requires: 0 */
const fs = require('fs')
const { parse } = require('node-html-parser')

const useCache = true

console.log('Fetching fishing achievements list')
fetch('https://api.guildwars2.com/v2/achievements/categories/317')
  .then((response) => response.json())
  .then(async (json) => {
    console.log('Fetching fishing achievements')
    let achievejson
    if (!useCache) {
      const res = await fetch(
        `https://api.guildwars2.com/v2/achievements?ids=${json.achievements.join(
          ','
        )}`
      )
      achievejson = await res.json()
      fs.writeFileSync('api-achievements.json', JSON.stringify(achievejson))
    } else {
      achievejson = JSON.parse(
        fs.readFileSync('api-achievements.json').toString()
      )
    }

    const targetAchievements = achievejson.filter((collection) =>
      /^(?!Avid).*(Fisher)$/.test(collection.name)
    )
    let fishData = []
    if (!useCache) {
      const fishIDs = targetAchievements.reduce((fishIDs, collection) => {
        return fishIDs.concat(collection.bits.map((bit) => bit.id))
      }, [])
      for (let i = 0; i < fishIDs.length / 200; i++) {
        const lowerBound = i * 200
        const upperBound = (i + 1) * 200
        const partialIDs = fishIDs.slice(lowerBound, upperBound)
        console.log(`Fetching fish ${lowerBound} up to ${upperBound}`)
        const partialFishData = await (
          await fetch(
            `https://api.guildwars2.com/v2/items?ids=${partialIDs.join(',')}`
          )
        ).json()
        fishData.push(...partialFishData)
      }
      fs.writeFileSync('api-fish-items.json', JSON.stringify(fishData))
    } else {
      fishData = JSON.parse(fs.readFileSync('api-fish-items.json').toString())
    }

    const fishIDToCollectionMap = targetAchievements.reduce(
      (map, collection) => {
        collection.bits.forEach((fishBit) => {
          map[fishBit.id] = collection.name
        })
        return map
      },
      {}
    )
    /*
    console.log('Fetching fish images')
    await fishData.forEach(async (fish) => {
      const filePath = `public/fish-images/${fish.id}.png`
      if (!fs.existsSync(filePath)) {
        const res = await fetch(fish.icon)
        const blob = await res.blob()
        const buffer = await blob.arrayBuffer()
        fs.writeFileSync(filePath, Buffer.from(buffer))
      }
    })
    */
    const mapped = await Promise.all(
      fishData.map(async (fish, i) => {
        const res = await fetch(
          `https://wiki.guildwars2.com/wiki/${fish.name.replace(' ', '_')}`
        )
        const text = await res.text()
        const root = parse(text)
        const hint = root.querySelector('.hint')
        const hintText = hint.childNodes
          .map((node) => {
            if (node.childNodes.length > 0) {
              return node.childNodes.map((node) => node._rawText).join(' ')
            } else {
              return node._rawText
            }
          })
          .join(' ')
        const regex =
          /Fishing\s*Hole\s*:\s*(.*)\s*Favored\s*Bait\s*:\s*(.*)\s*Time of Day\s*:\s*(.*)/
        const match = hintText.match(regex)
        const holes = match[1].split(',').map((hole) => hole.trim())
        const bait = match[2].trim()
        const time = match[3].trim()
        return {
          id: fish.id,
          name: fish.name,
          rarity: fish.rarity,
          collection: fishIDToCollectionMap[fish.id],
          holes,
          bait,
          time,
          img: fish.icon,
        }
      })
    )
    console.log('Writing fish.json')
    fs.writeFileSync('src/fish.json', JSON.stringify(mapped, null, 2))
  })
