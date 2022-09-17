// local
import { Bait } from './selects/BaitSelect'
import { CollectionName } from './selects/CollectionSelect'
import { HoleName } from './selects/HoleSelect'
import { Time } from './selects/TimeSelect'

type Rarity =
  | 'Basic'
  | 'Fine'
  | 'Masterwork'
  | 'Rare'
  | 'Exotic'
  | 'Ascended'
  | 'Legendary'

interface Fish {
  name: string
  collection: CollectionName
  holes: HoleName[]
  bait: Bait
  time: Time
  rarity: Rarity
  img: string
}

export default Fish
