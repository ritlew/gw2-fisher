// react
import React from 'react'

// chakra ui
import { FormControl } from '@chakra-ui/react'

// local
import Select, { SelectProps } from './Select'
import { CollectionName } from './CollectionSelect'

const times = ['Any', 'Daytime', 'Nighttime', 'Dusk/Dawn'] as const
export type Time = typeof times[number]
export const timeOptions = [...times]

const TimeSelect = (
  props: SelectProps<Time> & { collection?: CollectionName }
) => {
  return (
    <FormControl>
      <Select<Time> {...props} label="Time" options={timeOptions} />
    </FormControl>
  )
}

export default TimeSelect
