// react
import React, { useContext } from 'react'

// chakra ui
import { FormControl, useColorMode } from '@chakra-ui/react'

// local
import Select, { SelectProps } from './Select'
import CaughtFishContext from '../../contexts/CaughtFishContext'
import fishList from '../../data/fish'

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

const colors = {
  red: { dark: 'red.700', light: 'red.300' },
  orange: { dark: 'orange.700', light: 'orange.300' },
  green: { dark: 'green.700', light: 'green.300' },
}

const CollectionSelect = (props: SelectProps<CollectionName>) => {
  const { caughtFish } = useContext(CaughtFishContext)
  const { colorMode } = useColorMode()

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
        getOptionStyle={(option, { selected }) => {
          const fishInCollection = fishList.filter(
            (fish) => fish.collection === option
          )
          const fishCaughtInCollection = fishInCollection.reduce(
            (sum, fish) => sum + (caughtFish.includes(fish.id) ? 1 : 0),
            0
          )

          const contrastColor =
            (colorMode === 'dark') !== selected ? 'light' : 'dark'

          if (fishCaughtInCollection === 0) {
            return { color: colors.red[contrastColor] }
          } else if (fishCaughtInCollection < fishInCollection.length) {
            return { color: colors.orange[contrastColor] }
          } else {
            return { color: colors.green[contrastColor] }
          }
        }}
        options={collectionOptions}
      />
    </FormControl>
  )
}

export default CollectionSelect
