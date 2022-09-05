/* eslint @typescript-eslint/no-var-requires: 0 */
const https = require('https')
const fs = require('fs')
var slugify = require('slugify')
const fishList = require('./src/fish.json')

const baseOptions = {
  hostname: 'wiki.guildwars2.com',
  port: 443,
  method: 'GET',
  headers: {
    Accept: '*/*',
    'User-Agent':
      'Mozilla/5.0 (X11; Linux x86_64; rv:103.0) Gecko/20100101 Firefox/103.0',
  },
}

Promise.all(
  fishList.map(async (fish, i) => {
    const fileName = slugify(fish.name.toLowerCase()) + '.png'
    const filePath = `public/fish-images/${fileName}`
    if (fs.existsSync(filePath)) {
      return
    }

    const transformedName = fish.name.replace(' ', '_')

    const options = {
      ...baseOptions,
      path: `/wiki/${transformedName}#/media/File:${transformedName}.png`,
    }
    console.log(`/wiki/${transformedName}#/media/File:${transformedName}.png`)
    await new Promise((resolve) => {
      https.get(options, (res) => {
        let body = ''

        res.on('data', (chunk) => {
          body += chunk
        })

        res.on('end', () => {
          const regexp = '/images/./../' + transformedName + '.png'
          const match = body.match(regexp)
          if (!match) {
            console.log("ERROR! couldn't find src for ", fish.name)
            return
          }

          const options = {
            ...baseOptions,
            path: match[0],
          }
          https.get(options, (res) => {
            if (res.statusCode !== 200) {
              console.log('ERROR!', fish.name)
              return
            }
            const fileStream = fs.createWriteStream(filePath)
            res.on('data', (chunk) => {
              fileStream.write(chunk)
            })

            res.on('end', () => {
              fileStream.close()
              fishList[i] = { ...fish, img: fileName }
              resolve()
            })
          })
        })
      })
    })
  })
).then(() => {
  console.log('writing', fishList[1])
  fs.writeFileSync('src/fish.json', JSON.stringify(fishList, null, 2))
})
