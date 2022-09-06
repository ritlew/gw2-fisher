// react
import React, { useEffect, useReducer, useState } from 'react'

// chakra ui
import {
  Box,
  Collapse,
  Divider,
  Text,
  Image,
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
  Center,
  VStack,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@chakra-ui/react'
import CollectionSelect, {
  CollectionName,
  collectionOptions,
} from './selects/CollectionSelect'
import BaitSelect, { Bait } from './selects/BaitSelect'
import TimeSelect, { Time } from './selects/TimeSelect'
import HoleSelect, { HoleName } from './selects/HoleSelect'

// local
import fishJSON from './fish.json'
import Fish from './fish.interface'
import FishRow, { getRarityColor } from './FishRow'
import { ArrowDownIcon, ArrowUpIcon, CheckIcon } from '@chakra-ui/icons'

const fishList = fishJSON as Fish[]

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
  const [view, setView] = useState<'table' | 'collection'>('table')
  const [open, setOpen] = useState(true)
  const [filterText, setFilterText] = useState('')
  const [showHidden, toggleHide] = useReducer(
    (showHidden) => !showHidden,
    false
  )
  const [collection, setCollection] = useState<CollectionName>(
    collectionOptions[0]
  )
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
      if (collection !== fish.collection) {
        return false
      }
      /*
      if (collections.length > 0 && !collections.includes(fish.collection)) {
        return false
      }
      */
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
  }, [hiddenFish, showHidden, filterText, collection, holes, baits, times])

  return (
    <Box display="flex" flexDir="column" height="100%">
      <VStack p="2">
        <HStack w="100%" alignItems="end">
          <FormControl w="auto" flexGrow="1">
            <FormLabel mb="0">Fish Name</FormLabel>
            <Input
              size="sm"
              value={filterText}
              onChange={(event) => setFilterText(event.target.value)}
            />
          </FormControl>
          {false && (
            <FormControl w="auto" flexGrow="1">
              <FormLabel mb="0">Sort (not working)</FormLabel>
              <Select size="sm">
                <option value="collection a-z">Collection (A-Z)</option>
              </Select>
            </FormControl>
          )}
          <FormControl w="auto" flexGrow="1">
            <FormLabel mb="0">View</FormLabel>
            <Select
              size="sm"
              onChange={(event) =>
                setView(event.target.value as 'table' | 'collection')
              }
            >
              <option value="table">Table</option>
              <option value="collection">Collection</option>
            </Select>
          </FormControl>
          <Button size="sm" onClick={() => toggleHide()}>
            {showHidden ? 'Hide Hidden' : 'Show Hidden'}
          </Button>
        </HStack>
        <Box w="100%">
          <Collapse in={open} style={{ overflow: 'unset' }}>
            <SimpleGrid columns={2} spacing={2}>
              <CollectionSelect value={collection} onChange={setCollection} />
              <HoleSelect
                multi
                collection={collection}
                value={holes}
                onChange={setHoles}
              />
              <BaitSelect multi value={baits} onChange={setBaits} />
              <TimeSelect multi value={times} onChange={setTimes} />
            </SimpleGrid>
          </Collapse>
        </Box>
        <Button
          w="100%"
          size="xs"
          leftIcon={open ? <ArrowUpIcon /> : <ArrowDownIcon />}
          onClick={() => setOpen(!open)}
        >
          Filters
        </Button>
      </VStack>
      <Box flexGrow="1" overflow="hidden">
        {view === 'table' && (
          <TableContainer py={6} h="100%" overflow="hidden">
            <Table size="sm" display="block" overflow="hidden" h="100%">
              <Thead display="table" w="100%" style={{ tableLayout: 'fixed' }}>
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
              <Tbody overflowY="auto" display="block" h="calc(100% - 25px)">
                {displayedFish
                  .filter(
                    (fish) => showHidden || !hiddenFish.includes(fish.name)
                  )
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
        )}
        {view === 'collection' && (
          <Center py="6">
            <VStack>
              <Text>{collection}</Text>
              <SimpleGrid columns={7} spacing={1}>
                {fishList
                  .filter((fish) => fish.collection === collection)
                  .map((fish) => (
                    <Popover
                      key={fish.name}
                      trigger="hover"
                      openDelay={0}
                      closeDelay={0}
                    >
                      <PopoverTrigger>
                        <Box
                          position="relative"
                          w="64px"
                          h="64px"
                          cursor="pointer"
                          onClick={() =>
                            hiddenFish.includes(fish.name)
                              ? showFish(fish.name)
                              : hideFish(fish.name)
                          }
                        >
                          <Image
                            position="absolute"
                            border={`2px ${getRarityColor(fish.rarity, {
                              text: true,
                            })} solid`}
                            borderRadius="sm"
                            w="64px"
                            h="64px"
                            src={fish.img}
                          />
                          {hiddenFish.includes(fish.name) && (
                            <>
                              <Box
                                w="64px"
                                h="64px"
                                bgColor="blackAlpha.800"
                                position="absolute"
                              />
                              <Center h="100%" w="100%" position="absolute">
                                <CheckIcon fontSize="32px" color="blue.400" />
                              </Center>
                            </>
                          )}
                        </Box>
                      </PopoverTrigger>
                      <PopoverContent p="2" pointerEvents="none">
                        <VStack
                          alignItems="left"
                          spacing="4"
                          pointerEvents="none"
                        >
                          <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                          >
                            <Text fontSize="lg">{fish.name}</Text>
                            <Text
                              fontSize="sm"
                              color={getRarityColor(fish.rarity)}
                            >
                              {fish.rarity}
                            </Text>
                          </Box>
                          <Divider m="0 !important" />
                          <LabelBox label="Bait">{fish.bait}</LabelBox>
                          <LabelBox label="Time">{fish.time}</LabelBox>
                          <LabelBox label="Holes">
                            {fish.holes.map((hole) => (
                              <Text key={hole}>{hole}</Text>
                            ))}
                          </LabelBox>
                        </VStack>
                      </PopoverContent>
                    </Popover>
                  ))}
              </SimpleGrid>
            </VStack>
          </Center>
        )}
      </Box>
    </Box>
  )
}

interface LabelBoxProps {
  label: string
  children: React.ReactNode
}

const LabelBox: React.FC<LabelBoxProps> = ({ label, children }) => {
  return (
    <Box>
      <Text fontSize="xs">{label}</Text>
      <Text>{children}</Text>
    </Box>
  )
}

export default Tracker
