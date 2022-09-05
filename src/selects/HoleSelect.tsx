// react
import React from 'react'

// chakra ui
import { FormControl } from '@chakra-ui/react'

// local
import Select, { SelectProps } from './Select'
import { CollectionName } from './CollectionSelect'

const holeNames = [
  'None',
  'Any',
  'Open Water',
  'Freshwater Fish',
  'Saltwater Fish',
] as const
export type HoleName = typeof holeNames[number]
export const holeOptions = [...holeNames]

const collectionHoleMap: Record<CollectionName, typeof holeNames[number][]> = {
  'Maguuma Fisher': ['Freshwater Fish', 'Saltwater Fish'],
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
      <Select<HoleName> {...props} label="Hole" options={options} />
    </FormControl>
  )
}

export default HoleSelect
