// react
import { createContext } from 'react'

// local
import Fish from './fish.interface'

interface CaughtFishContext {
  caughtFish: Fish['id'][]
  hideFish: (fishID: Fish['id']) => void
  showFish: (fishID: Fish['id']) => void
}

const CaughtFishContext = createContext<CaughtFishContext>({
  caughtFish: [],
  hideFish: () => undefined,
  showFish: () => undefined,
})

export default CaughtFishContext
