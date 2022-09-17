// react
import { useState, useEffect } from 'react'

// local
import Fish from './fish.interface'
import fishList from './fish'

const useCaughtFish = (): [
  Fish['id'][],
  (newFish: Fish['id']) => void,
  (newFish: Fish['id']) => void
] => {
  const caughtStr = localStorage.getItem('hiddenFish')
  const caught: number[] = caughtStr ? JSON.parse(caughtStr) : []
  const [caughtFish, setCaughtFish] = useState<Fish['id'][]>(caught)

  useEffect(() => {
    // convert fish names to ids
    if (caught.length > 0 && typeof caught[0] === 'string') {
      const convertedFish = (caughtFish as unknown as string[])
        .map((fishName) => fishList.find((fish) => fish.name === fishName)?.id)
        .filter((id): id is number => id !== undefined)

      localStorage.setItem('hiddenFish', JSON.stringify(convertedFish))
      setCaughtFish(convertedFish)
    }
  }, [])

  return [
    caughtFish,
    (fishID) => {
      const newCaught = Array.from(new Set([...caughtFish, fishID]))
      setCaughtFish(newCaught)
      localStorage.setItem('hiddenFish', JSON.stringify(newCaught))
    },
    (fishID) => {
      const newCaught = caughtFish.filter((fish) => fish !== fishID)
      setCaughtFish(newCaught)
      localStorage.setItem('hiddenFish', JSON.stringify(newCaught))
    },
  ]
}

export default useCaughtFish
