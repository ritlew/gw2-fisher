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
import { CSSObject } from '@emotion/react'

type BaseProps<T extends string> = {
  label?: string
  isDisabled?: boolean
  sort?: boolean
  options?: T[]
  getLabel?: (value: T) => string
  getOptionStyle?: (value: T, options: { selected: boolean }) => CSSObject
}

export type SelectProps<T extends string> =
  | (BaseProps<T> & { multi: true; value: T[]; onChange: (value: T[]) => void })
  | (BaseProps<T> & { multi?: false; value: T; onChange: (value: T) => void })

const Select = <T extends string>({
  label = '',
  multi = false,
  isDisabled = false,
  sort = false,
  options = [],
  value,
  getLabel,
  getOptionStyle,
  onChange,
}: SelectProps<T>) => {
  const selectOptions = options.map((option) => ({
    value: option,
    label: getLabel ? getLabel(option) : option,
  }))

  if (sort) {
    selectOptions.sort((a, b) => a.label.localeCompare(b.label))
  }

  return (
    <FormControl>
      <FormLabel mb="0">{label}</FormLabel>
      <ChakraSelect
        size="sm"
        isDisabled={isDisabled}
        isMulti={multi}
        variant="outline"
        value={
          multi
            ? selectOptions.filter((option) =>
                (value as T[]).includes(option.value)
              )
            : selectOptions.find((option) => option.value === value)
        }
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
        chakraStyles={{
          option: (provided, state) => {
            const extra =
              getOptionStyle?.(state.data.value, {
                selected: state.isSelected,
              }) ?? {}

            return { ...provided, ...extra }
          },
          singleValue: (provided, state) => {
            const extra =
              getOptionStyle?.(state.data.value, {
                selected: false,
              }) ?? {}

            return { ...provided, ...extra }
          },
        }}
        options={selectOptions}
      />
    </FormControl>
  )
}

export default Select
