// react
import React from 'react'

// chakra ui
import { FormControl } from '@chakra-ui/react'

// local
import Select, { SelectProps } from './Select'

const collectionNames = [
  'Shiverpeaks Fisher',
  'Orrian Fisher',
  "Dragon's End Fisher",
  'Desert Fisher',
  'Kaineng Fisher',
  'Ascalonian Fisher',
  'Ring of Fire Fisher',
  'World Class Fisher',
  'Desert Isles Fisher',
  'Saltwater Fisher',
  'Krytan Fisher',
  'Maguuma Fisher',
  'Seitung Province Fisher',
  'Echovald Wilds Fisher',
] as const
export type CollectionName = typeof collectionNames[number]
export const collectionOptions: CollectionName[] = [...collectionNames]

const CollectionSelect = (props: SelectProps<CollectionName>) => {
  return (
    <FormControl>
      <Select<CollectionName>
        {...props}
        label="Collection"
        options={collectionOptions}
      />
    </FormControl>
  )
}

export default CollectionSelect
