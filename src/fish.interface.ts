// local
import { Bait } from './components/selects/BaitSelect'
import { CollectionName } from './components/selects/CollectionSelect'
import { HoleName } from './components/selects/HoleSelect'
import { Time } from './components/selects/TimeSelect'

type Rarity =
  | 'Basic'
  | 'Fine'
  | 'Masterwork'
  | 'Rare'
  | 'Exotic'
  | 'Ascended'
  | 'Legendary'

interface Fish {
  id: number
  name: string
  collection: CollectionName
  holes: HoleName[]
  bait: Bait
  time: Time
  rarity: Rarity
  img: string
}

export default Fish
