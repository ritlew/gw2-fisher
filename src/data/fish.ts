// local
import Fish from '../fish.interface'
import fishList from './fish.json'

const getRarityColor = (
  rarity: Fish['rarity'],
  { text }: { text?: boolean } = {}
) => {
  switch (rarity) {
    default:
    case 'Basic':
      return '#AAA'
    case 'Fine':
      return '#62A4DA'
    case 'Masterwork':
      return '#1a9306'
    case 'Rare':
      return '#fcd00b'
    case 'Exotic':
      return '#ffa405'
    case 'Ascended':
      return '#fb3e8d'
    case 'Legendary':
      return text ? '#4C139D' : '#B181F7'
  }
}

export default fishList as Fish[]
export { getRarityColor }
