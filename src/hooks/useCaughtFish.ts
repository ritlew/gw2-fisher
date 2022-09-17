// local
import Fish from '../fish.interface'
import { useLocalStorageState } from './useLocalStorage'

const useCaughtFish = (): [
  Fish['id'][],
  (newFish: Fish['id']) => void,
  (newFish: Fish['id']) => void
] => {
  const [caught, setCaught] = useLocalStorageState<Fish['id'][]>(
    'hiddenFish',
    []
  )

  return [
    caught,
    (fishID) => {
      const newCaught = Array.from(new Set([...caught, fishID]))
      setCaught(newCaught)
    },
    (fishID) => {
      const newCaught = caught.filter((fish) => fish !== fishID)
      setCaught(newCaught)
    },
  ]
}

export default useCaughtFish
