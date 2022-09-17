// react
import React, { useEffect, useReducer, useState, useContext } from 'react'

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
  Checkbox,
} from '@chakra-ui/react'
import CollectionSelect, {
  CollectionName,
  collectionOptions,
} from '../components/selects/CollectionSelect'
import BaitSelect, { Bait } from '../components/selects/BaitSelect'
import TimeSelect, { Time } from '../components/selects/TimeSelect'
import HoleSelect, { HoleName } from '../components/selects/HoleSelect'

// local
import fishList, { getRarityColor } from '../data/fish'
import Fish from '../fish.interface'
import CaughtFishContext from '../contexts/CaughtFishContext'
import FishRow from '../components/FishRow'
import { ArrowDownIcon, ArrowUpIcon, CheckIcon } from '@chakra-ui/icons'
import useDayNightCycle from '../hooks/useDayNightCycle'

const filterFish = (
  fishList: Fish[],
  {
    name,
    collection,
    holes,
    baits,
    times,
    includeAny,
  }: {
    name: string
    collection: CollectionName
    holes: HoleName[]
    baits: Bait[]
    times: Time[]
    includeAny: boolean
  }
): Fish[] => {
  return fishList
    .filter((fish) => fish.name.toLowerCase().includes(name.toLowerCase()))
    .filter((fish) => collection === fish.collection)
    .filter((fish) => {
      return (
        holes.length === 0 ||
        (includeAny && fish.holes.includes('Any')) ||
        holes.some((filterHole) =>
          fish.holes.some((fishHole) => filterHole === fishHole)
        )
      )
    })
    .filter((fish) => {
      return (
        baits.length === 0 ||
        (includeAny && fish.bait === 'Any') ||
        baits.some((bait) => bait === fish.bait)
      )
    })
    .filter((fish) => {
      return (
        times.length === 0 ||
        (includeAny && fish.time === 'Any') ||
        times.some((time) => time === fish.time)
      )
    })
}

interface TrackerProps {}

const Tracker: React.FC<TrackerProps> = ({}) => {
  const [view, setView] = useState<'table' | 'collection'>('table')
  const [open, setOpen] = useState(true)
  const [filterText, setFilterText] = useState('')
  const [includeAny, setIncludeAny] = useState(true)
  const [autoTime, toggleAutotime] = useReducer((autoTime) => !autoTime, false)
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
  const { caughtFish, hideFish, showFish } = useContext(CaughtFishContext)
  const [displayedFish, setDisplayedFish] = useState<Fish[]>(fishList as Fish[])
  const { time } = useDayNightCycle()

  useEffect(() => {
    if (autoTime && times.every((selectedTime) => selectedTime === time)) {
      setTimes([time])
    }
  }, [autoTime, time])

  useEffect(() => {
    const filteredFish = filterFish(fishList, {
      includeAny,
      name: filterText,
      collection,
      holes,
      baits,
      times,
    })

    filteredFish.sort((f1, f2) => f1.collection.localeCompare(f2.collection))

    setDisplayedFish(filteredFish)
  }, [includeAny, caughtFish, filterText, collection, holes, baits, times])

  return (
    <Box display="flex" flexDir="column" height="100%">
      <VStack p="2">
        <SimpleGrid w="100%" columns={3} spacing={2}>
          <FormControl w="auto" flex="1 1">
            <FormLabel mb="0">Fish Name</FormLabel>
            <Input
              size="sm"
              value={filterText}
              onChange={(event) => setFilterText(event.target.value)}
            />
          </FormControl>
          <Box flex="1 1">
            <CollectionSelect value={collection} onChange={setCollection} />
          </Box>
          {false && (
            <FormControl w="auto" flexGrow="1">
              <FormLabel mb="0">Sort (not working)</FormLabel>
              <Select size="sm">
                <option value="collection a-z">Collection (A-Z)</option>
              </Select>
            </FormControl>
          )}
          <FormControl w="auto" flex="1 1">
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
        </SimpleGrid>
        {view === 'table' && (
          <>
            <Box w="100%">
              <Collapse in={open} style={{ overflow: 'unset' }}>
                <SimpleGrid columns={3} spacing={2}>
                  <HoleSelect
                    multi
                    collection={collection}
                    value={holes}
                    onChange={setHoles}
                  />
                  <BaitSelect
                    multi
                    collection={collection}
                    value={baits}
                    onChange={setBaits}
                  />
                  <TimeSelect
                    multi
                    isDisabled={autoTime}
                    value={times}
                    onChange={setTimes}
                  />
                </SimpleGrid>
                <Center mt={2}>
                  <HStack spacing="1rem">
                    <Checkbox
                      isChecked={includeAny}
                      onChange={(event) => setIncludeAny(event.target.checked)}
                    >
                      Always include &quot;Any&quot;
                    </Checkbox>
                    <Checkbox
                      isChecked={autoTime}
                      onChange={() => toggleAutotime()}
                    >
                      Auto-set Time
                    </Checkbox>
                    <Checkbox
                      isChecked={showHidden}
                      onChange={() => toggleHide()}
                    >
                      Show Hidden
                    </Checkbox>
                  </HStack>
                </Center>
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
          </>
        )}
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
                  .filter((fish) => showHidden || !caughtFish.includes(fish.id))
                  .map((fish) => (
                    <FishRow key={fish.name} fish={fish} />
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
                            caughtFish.includes(fish.id)
                              ? showFish(fish.id)
                              : hideFish(fish.id)
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
                          {caughtFish.includes(fish.id) && (
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
                              <React.Fragment key={hole}>
                                {hole}
                                <br />
                              </React.Fragment>
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
