// react
import React, { useEffect, useState, useContext } from 'react'

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
  useBoolean,
} from '@chakra-ui/react'
import CollectionSelect, {
  CollectionName,
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
    collection,
    holes,
    baits,
    times,
    includeAny,
  }: {
    collection: CollectionName
    holes: HoleName[]
    baits: Bait[]
    times: Time[]
    includeAny: boolean
  }
): Fish[] => {
  return fishList
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

const collectionFishMap = fishList.reduce<Record<CollectionName, Fish[]>>(
  (map, fish) => {
    map[fish.collection] = [...(map[fish.collection] || []), fish]
    return map
  },
  {} as Record<CollectionName, Fish[]>
)

interface TrackerProps {
  canthanTime: boolean
  collection: CollectionName
  onCollectionChange: (collection: CollectionName) => void
}

const Tracker: React.FC<TrackerProps> = ({
  canthanTime,
  collection,
  onCollectionChange,
}) => {
  const [view, setView] = useState<'table' | 'collection'>('table')
  const [showFilters, setShowFilters] = useState(true)
  const [includeAny, setIncludeAny] = useBoolean(true)
  const [autoTime, setAutoTime] = useBoolean()
  const [showHidden, setShowHiddenHide] = useBoolean()
  const [holes, setHoles] = useState<HoleName[]>([])
  const [baits, setBaits] = useState<Bait[]>([])
  const [times, setTimes] = useState<Time[]>([])
  const { caughtFish, hideFish, showFish } = useContext(CaughtFishContext)
  const [displayedFish, setDisplayedFish] = useState<Fish[]>(
    collectionFishMap[collection]
  )
  const { time } = useDayNightCycle({ canthanTime })

  useEffect(() => {
    if (
      autoTime &&
      (times.length === 0 ||
        !times.every((selectedTime) => selectedTime === time))
    ) {
      setTimes([time])
    }
  }, [autoTime, time])

  useEffect(() => {
    const filteredFish = filterFish(collectionFishMap[collection], {
      includeAny,
      collection,
      holes,
      baits,
      times,
    })

    filteredFish.sort((f1, f2) => f1.collection.localeCompare(f2.collection))

    setDisplayedFish(filteredFish)
  }, [includeAny, caughtFish, collection, holes, baits, times])

  return (
    <Box display="flex" flexDir="column" height="100%">
      <VStack p="2">
        <Center w="50%">
          <SimpleGrid w="100%" columns={2} spacing={2} alignItems="flex-end">
            <CollectionSelect
              sort
              value={collection}
              onChange={(collection) => {
                setHoles([])
                setBaits([])
                onCollectionChange(collection)
              }}
            />
            {false && (
              <FormControl w="auto" flexGrow="1">
                <FormLabel mb="0">Sort (not working)</FormLabel>
                <Select size="sm">
                  <option value="collection a-z">Collection (A-Z)</option>
                </Select>
              </FormControl>
            )}
            <Button
              size="sm"
              onClick={() => setView(view === 'table' ? 'collection' : 'table')}
            >
              {`Switch to ${view === 'table' ? 'collection' : 'table'} view`}
            </Button>
          </SimpleGrid>
        </Center>
        {view === 'table' && (
          <>
            <Box w="100%">
              <Collapse in={showFilters} style={{ overflow: 'unset' }}>
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
                      onChange={() => setIncludeAny.toggle()}
                    >
                      Always include &quot;Any&quot;
                    </Checkbox>
                    <Checkbox
                      isChecked={autoTime}
                      onChange={() => setAutoTime.toggle()}
                    >
                      Auto-set Time
                    </Checkbox>
                    <Checkbox
                      isChecked={showHidden}
                      onChange={() => setShowHiddenHide.toggle()}
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
              leftIcon={showFilters ? <ArrowUpIcon /> : <ArrowDownIcon />}
              onClick={() => setShowFilters(!showFilters)}
            >
              Filters
            </Button>
          </>
        )}
      </VStack>
      <Box flexGrow="1" overflow="hidden">
        {view === 'table' && (
          <TableContainer pt={6} h="100%" overflow="hidden">
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
                {collectionFishMap[collection].map((fish) => (
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
