// react
import React from 'react'

// chakra ui
import { FormControl } from '@chakra-ui/react'

// local
import Select, { SelectProps } from './Select'
import { CollectionName } from './CollectionSelect'

const baits = [
  'Any',
  'Ramshorn Snails',
  'Shrimplings',
  'Leeches',
  'Sardines',
  'Nightcrawlers',
  'Scorpions',
  'Mackerel',
  'Fish Eggs',
  'Minnows',
  'Lightning Bugs',
  'Lava Beetles',
  'Sparkfly Larva',
  'Sardine',
  'Glow Worms',
]
export type Bait = typeof baits[number]
export const baitOptions = [...baits]

const collectionBaitMap: Record<CollectionName, typeof baits[number][]> = {
  'Shiverpeaks Fisher': ['Ramshorn Snails', 'Shrimplings'],
  'Orrian Fisher': ['Leeches', 'Sardines'],
  "Dragon's End Fisher": ['Nightcrawlers', 'Shrimplings'],
  'Desert Fisher': ['Scorpions', 'Mackerel'],
  'Kaineng Fisher': ['Sardines', 'Mackerel', 'Shrimplings'],
  'Ascalonian Fisher': ['Fish Eggs', 'Minnows', 'Lightning Bugs'],
  'Ring of Fire Fisher': ['Lava Beetles'],
  'World Class Fisher': [],
  'Desert Isles Fisher': ['Mackerel', 'Fish Eggs'],
  'Saltwater Fisher': [],
  'Krytan Fisher': ['Fish Eggs', 'Minnows', 'Shrimplings'],
  'Maguuma Fisher': ['Sparkfly Larva', 'Sardine'],
  'Seitung Province Fisher': ['Shrimplings', 'Sardines'],
  'Echovald Wilds Fisher': ['Minnows', 'Glow Worms'],
}

const BaitSelect = (
  props: SelectProps<Bait> & { collection?: CollectionName }
) => {
  let options = baitOptions
  if (props.collection) {
    options = ['Any', ...collectionBaitMap[props.collection]]
  }
  return (
    <FormControl>
      <Select<Bait> {...props} label="Bait" options={options} />
    </FormControl>
  )
}

export default BaitSelect
