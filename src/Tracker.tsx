// react
import React, { useEffect, useReducer, useState } from 'react'

// chakra ui
import {
  Box,
  SimpleGrid,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Input,
  FormControl,
  FormLabel,
  HStack,
  Select,
  Button,
} from '@chakra-ui/react'
import CollectionSelect, { CollectionName } from './selects/CollectionSelect'
import BaitSelect, { Bait } from './selects/BaitSelect'
import TimeSelect, { Time } from './selects/TimeSelect'
import HoleSelect, { HoleName } from './selects/HoleSelect'

// local
import fishList from './fish.json'
import Fish from './fish.interface'
import FishRow from './FishRow'

const useHiddenFish = (): [
  string[],
  (newFish: string) => void,
  (newFish: string) => void
] => {
  const hiddenStr = localStorage.getItem('hiddenFish')
  const hidden: string[] = hiddenStr ? JSON.parse(hiddenStr) : []
  const [hiddenFish, setHiddenFish] = useState(hidden)

  return [
    hiddenFish,
    (newFish: string) => {
      const newHidden = Array.from(new Set([...hidden, newFish]))
      setHiddenFish(newHidden)
      localStorage.setItem('hiddenFish', JSON.stringify(newHidden))
    },
    (newFish: string) => {
      const newHidden = hidden.filter((fish) => fish !== newFish)
      setHiddenFish(newHidden)
      localStorage.setItem('hiddenFish', JSON.stringify(newHidden))
    },
  ]
}

interface TrackerProps {}

const Tracker: React.FC<TrackerProps> = ({}) => {
  const [filterText, setFilterText] = useState('')
  const [showHidden, toggleHide] = useReducer(
    (showHidden) => !showHidden,
    false
  )
  const [collections, setCollections] = useState<CollectionName[]>([])
  const [holes, setHoles] = useState<HoleName[]>([])
  const [baits, setBaits] = useState<Bait[]>([])
  const [times, setTimes] = useState<Time[]>([])
  const [hiddenFish, hideFish, showFish] = useHiddenFish()
  const [displayedFish, setDisplayedFish] = useState<Fish[]>(fishList as Fish[])

  useEffect(() => {
    const filteredFish = (fishList as Fish[]).filter((fish) => {
      if (
        filterText &&
        !fish.name.toLowerCase().includes(filterText.toLowerCase())
      ) {
        return false
      }
      if (collections.length > 0 && !collections.includes(fish.collection)) {
        return false
      }
      if (
        !fish.holes.includes('Any') &&
        holes.length > 0 &&
        !holes.some((hole) => fish.holes.includes(hole))
      ) {
        return false
      }
      if (
        fish.bait !== 'Any' &&
        baits.length > 0 &&
        !baits.includes(fish.bait)
      ) {
        return false
      }
      if (
        fish.time !== 'Any' &&
        times.length > 0 &&
        !times.includes(fish.time)
      ) {
        return false
      }
      return true
    })

    filteredFish.sort((f1, f2) => f1.collection.localeCompare(f2.collection))

    setDisplayedFish(filteredFish)
  }, [hiddenFish, showHidden, filterText, collections, holes, baits, times])

  return (
    <Box>
      <HStack p={2} alignItems="end">
        <FormControl w="auto" flexGrow="1">
          <FormLabel mb="0">Fish Name</FormLabel>
          <Input
            size="sm"
            value={filterText}
            onChange={(event) => setFilterText(event.target.value)}
          />
        </FormControl>
        <FormControl w="auto" flexGrow="1">
          <FormLabel mb="0">Sort (not working)</FormLabel>
          <Select size="sm">
            <option value="collection a-z">Collection (A-Z)</option>
          </Select>
        </FormControl>
        <Button size="sm" onClick={() => toggleHide()}>
          {showHidden ? 'Hide Hidden' : 'Show Hidden'}
        </Button>
      </HStack>
      <SimpleGrid columns={2} spacing={2} p={2}>
        <CollectionSelect multi value={collections} onChange={setCollections} />
        <HoleSelect multi value={holes} onChange={setHoles} />
        <BaitSelect multi value={baits} onChange={setBaits} />
        <TimeSelect multi value={times} onChange={setTimes} />
      </SimpleGrid>
      <TableContainer py={6}>
        <Table size="sm">
          <Thead>
            <Tr>
              <Th />
              <Th>Name</Th>
              <Th>Collection</Th>
              <Th>Bait</Th>
              <Th>Time</Th>
              <Th>Holes</Th>
              <Th align="right" />
            </Tr>
          </Thead>
          <Tbody>
            {displayedFish
              .filter((fish) => showHidden || !hiddenFish.includes(fish.name))
              .map((fish) => (
                <FishRow
                  key={fish.name}
                  fish={fish}
                  hidden={hiddenFish.includes(fish.name)}
                  onHide={(name) => hideFish(name)}
                  onShow={(name) => showFish(name)}
                />
              ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default Tracker
