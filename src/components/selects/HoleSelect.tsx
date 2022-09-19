// react
import React from 'react'

// chakra ui
import { FormControl } from '@chakra-ui/react'

// local
import Select, { SelectProps } from './Select'
import { CollectionName } from './CollectionSelect'

const holeNames = [
  'None',
  'Open Water',
  'Any',
  'Lake Fish',
  'Boreal Fish',
  'Offshore Fish',
  'Shore Fish',
  'Quarry Fish',
  'Cavern Fish',
  'Desert Fish',
  'Coastal Fish',
  'Channel Fish',
  'Noxious Water Fish',
  'Volcanic Fish',
  'River Fish',
  'Freshwater Fish',
  'Saltwater Fish',
  'Grotto Fish',
] as const
export type HoleName = typeof holeNames[number]
export const holeOptions = [...holeNames]

const collectionHoleMap: Record<CollectionName, typeof holeNames[number][]> = {
  'Shiverpeaks Fisher': ['Lake Fish', 'Boreal Fish'],
  'Orrian Fisher': ['Offshore Fish', 'Shore Fish'],
  "Dragon's End Fisher": ['Quarry Fish', 'Cavern Fish'],
  'Desert Fisher': ['Desert Fish'],
  'Kaineng Fisher': ['Coastal Fish', 'Channel Fish'],
  'Ascalonian Fisher': ['Lake Fish', 'Noxious Water Fish'],
  'Ring of Fire Fisher': ['Volcanic Fish', 'Coastal Fish'],
  'World Class Fisher': [],
  'Desert Isles Fisher': ['Shore Fish', 'Offshore Fish'],
  'Saltwater Fisher': [],
  'Krytan Fisher': ['River Fish', 'Lake Fish', 'Coastal Fish'],
  'Maguuma Fisher': ['Freshwater Fish', 'Saltwater Fish'],
  'Seitung Province Fisher': ['Shore Fish', 'Offshore Fish'],
  'Echovald Wilds Fisher': ['Lake Fish', 'Grotto Fish'],
}

const HoleSelect = (
  props: SelectProps<HoleName> & { collection?: CollectionName }
) => {
  let options = holeOptions
  if (props.collection) {
    options = [
      'None',
      'Any',
      'Open Water',
      ...collectionHoleMap[props.collection],
    ]
  }
  return (
    <FormControl>
      <Select<HoleName> {...props} label="Fishing Hole" options={options} />
    </FormControl>
  )
}

export default HoleSelect
