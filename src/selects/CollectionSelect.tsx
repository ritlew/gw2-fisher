// react
import React from 'react'

// chakra ui
import { FormControl } from '@chakra-ui/react'

// local
import Select, { SelectProps } from './Select'

const collectionNames = ['Maguuma Fisher'] as const
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
