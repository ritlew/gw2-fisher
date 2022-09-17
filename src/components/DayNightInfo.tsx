// react
import React from 'react'

// chakra ui
import { Box, Text, HStack, VStack, Divider } from '@chakra-ui/react'
import useDayNightCycle from '../hooks/useDayNightCycle'
import { Time } from './selects/TimeSelect'

interface DayNightInfoProps {}

const cycle: Time[] = ['Daytime', 'Dusk/Dawn', 'Nighttime', 'Dusk/Dawn']

const DayNightInfo: React.FC<DayNightInfoProps> = ({}) => {
  const { time, msUntilNext } = useDayNightCycle()
  const next =
    cycle[
      (cycle.findIndex((cycleTime) => cycleTime === time) + 1) % cycle.length
    ]

  return (
    <Box display="flex" justifyContent="space-around">
      <HStack>
        <VStack spacing={0}>
          <Text fontSize="xs">Current</Text>
          <Text>{time}</Text>
        </VStack>
        <Divider orientation="vertical" />
        <VStack spacing={0}>
          <Text fontSize="xs">
            {Math.floor(msUntilNext / (1000 * 60))} minutes until
          </Text>
          <Text>{next}</Text>
        </VStack>
      </HStack>
    </Box>
  )
}

export default DayNightInfo
