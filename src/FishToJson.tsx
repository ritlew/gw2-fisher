// react
import React, { useEffect, useRef, useState } from 'react'

// chakra ui
import {
  Container,
  FormControl,
  FormLabel,
  Input,
  SimpleGrid,
  Textarea,
  Button,
} from '@chakra-ui/react'

// third party
import { Select } from 'chakra-react-select'
import ResizeTextarea from 'react-textarea-autosize'
import CollectionSelect, {
  CollectionName,
  collectionOptions,
} from './selects/CollectionSelect'
import HoleSelect, { HoleName, holeOptions } from './selects/HoleSelect'
import BaitSelect, { Bait } from './selects/BaitSelect'
import TimeSelect from './selects/TimeSelect'

const times = ['Any', 'Daytime', 'Nighttime', 'Dusk/Dawn']
type Time = typeof times[number]
const timeOptions: { value: Time; label: Time }[] = times.map((time) => ({
  value: time,
  label: time,
}))

interface FishToJsonProps {}

const FishToJson: React.FC<FishToJsonProps> = ({}) => {
  const ref = useRef<HTMLInputElement | null>(null)
  const [name, setName] = useState('')
  const [collection, setCollection] = useState<CollectionName>(
    collectionOptions[0]
  )
  const [holes, setHoles] = useState<HoleName[]>([])
  const [bait, setBait] = useState<Bait>('Any')
  const [time, setTime] = useState<Time>('Any')

  const jsonStr =
    JSON.stringify(
      {
        name,
        collection,
        holes,
        bait,
        time,
      },
      null,
      2
    ) + ',\n'

  useEffect(() => {
    navigator.clipboard.writeText(jsonStr)
  }, [jsonStr])

  return (
    <Container maxW="xl">
      <SimpleGrid marginTop="2rem" columns={1} spacing="4">
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input
            ref={ref}
            variant="outline"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </FormControl>
        <CollectionSelect value={collection} onChange={setCollection} />
        <HoleSelect
          multi
          value={holes}
          onChange={setHoles}
          options={holeOptions}
        />
        <BaitSelect value={bait} onChange={setBait} />
        <TimeSelect value={time} onChange={setTime} />
        <FormControl>
          <FormLabel>JSON</FormLabel>
          <Textarea
            as={ResizeTextarea}
            readOnly
            resize="vertical"
            value={jsonStr}
          />
        </FormControl>
        <SimpleGrid columns={2} spacing="4">
          <Button
            flexGrow={1}
            onClick={() => navigator.clipboard.writeText(jsonStr)}
          >
            Copy
          </Button>
          <Button
            flexGrow={1}
            onClick={() => {
              setName('')
              setHoles([])
              setBait('Any')
              setTime('Any')
              ref.current?.focus()
            }}
          >
            Reset
          </Button>
        </SimpleGrid>
      </SimpleGrid>
    </Container>
  )
}

export default FishToJson
