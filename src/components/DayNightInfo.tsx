// react
import React from 'react'

// chakra ui
import { Box, Text, HStack, VStack, Divider } from '@chakra-ui/react'
import useDayNightCycle from '../hooks/useDayNightCycle'

interface DayNightInfoProps {
  canthanTime?: boolean
}

const DayNightInfo: React.FC<DayNightInfoProps> = ({ canthanTime = false }) => {
  const { time, next, msUntilNext } = useDayNightCycle({
    updateMsUntilNext: true,
    canthanTime,
  })

  const countdown =
    msUntilNext / 1000 > 60
      ? `${Math.ceil(msUntilNext / (1000 * 60))} minute${
          Math.ceil(msUntilNext / (1000 * 60)) >= 2 ? 's' : ''
        } until`
      : `${Math.ceil(msUntilNext / 1000)} second${
          Math.ceil(msUntilNext / 1000) >= 2 ? 's' : ''
        } until`

  return (
    <Box display="flex" justifyContent="space-around">
      <HStack>
        <VStack spacing={0}>
          <Text fontSize="xs">
            Current
            {canthanTime && <>&nbsp;(Canthan)</>}
          </Text>
          <Text>{time}</Text>
        </VStack>
        <Divider orientation="vertical" />
        <VStack spacing={0}>
          <Text fontSize="xs">{countdown}</Text>
          <Text>{next}</Text>
        </VStack>
      </HStack>
    </Box>
  )
}

export default DayNightInfo
