// react
import React from 'react'

// chakra ui
import { FormControl, FormLabel } from '@chakra-ui/react'

// third party
import {
  Select as ChakraSelect,
  SingleValue,
  MultiValue,
} from 'chakra-react-select'

type BaseProps<T> = { label?: string; options?: T[] }

export type SelectProps<T> =
  | (BaseProps<T> & { multi: true; value: T[]; onChange: (value: T[]) => void })
  | (BaseProps<T> & { multi?: false; value: T; onChange: (value: T) => void })

const Select = <T,>({
  label = '',
  multi = false,
  options = [],
  value,
  onChange,
}: SelectProps<T>) => {
  const selectOptions = options.map((option) => ({
    value: option,
    label: option,
  }))
  return (
    <FormControl>
      <FormLabel mb="0">{label}</FormLabel>
      <ChakraSelect
        size="sm"
        isMulti={multi}
        variant="outline"
        value={selectOptions.find((option) => option.value === value)}
        onChange={(value2) => {
          if (multi) {
            ;(onChange as (value: T[]) => void)(
              (value2 as MultiValue<{ value: T; label: T }>).map(
                (option) => option.value
              )
            )
          } else {
            ;(onChange as (value: T) => void)(
              (value2 as SingleValue<{ value: T; label: T }>)?.value ??
                options[0]
            )
          }
        }}
        options={selectOptions}
      />
    </FormControl>
  )
}

export default Select
