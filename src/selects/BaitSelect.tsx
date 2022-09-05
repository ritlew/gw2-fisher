// react
import React from 'react'

// chakra ui
import { FormControl } from '@chakra-ui/react'

// local
import Select, { SelectProps } from './Select'

const baits = ['Any', 'Sparkfly Larvae', 'Sardines']
export type Bait = typeof baits[number]
export const baitOptions = [...baits]

const BaitSelect = (props: SelectProps<Bait>) => {
  return (
    <FormControl>
      <Select<Bait> {...props} label="Bait" options={baitOptions} />
    </FormControl>
  )
}

export default BaitSelect
