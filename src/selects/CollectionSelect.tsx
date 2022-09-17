// react
import React, { useContext } from 'react'

// chakra ui
import { FormControl } from '@chakra-ui/react'

// local
import Select, { SelectProps } from './Select'
import CaughtFishContext from '../CaughtFishContext'
import fishList from '../fish'

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
  const { caughtFish } = useContext(CaughtFishContext)

  return (
    <FormControl>
      <Select<CollectionName>
        {...props}
        label="Collection"
        getLabel={(option) => {
          const fishInCollection = fishList.filter(
            (fish) => fish.collection === option
          )
          const fishCaughtInCollection = fishInCollection.reduce(
            (sum, fish) => sum + (caughtFish.includes(fish.id) ? 1 : 0),
            0
          )
          return `${option} (${fishCaughtInCollection}/${fishInCollection.length})`
        }}
        options={collectionOptions}
      />
    </FormControl>
  )
}

export default CollectionSelect
