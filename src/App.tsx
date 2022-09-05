// react
import React, { useState } from 'react'

// chakra ui
import {
  ChakraProvider,
  extendTheme,
  Container,
  Box,
  Button,
  HStack,
} from '@chakra-ui/react'

// local
import FishToJson from './FishToJson'
import Tracker from './Tracker'
import { ColorModeSwitcher } from './ColorModeSwitcher'

const theme = extendTheme({
  initialColorMode: 'dark',
})

export const App = () => {
  const [page, setPage] = useState<'tracker' | 'input'>('tracker')

  return (
    <ChakraProvider theme={theme}>
      <Container maxW="container.xl">
        <HStack pt={4} justifyContent="space-between">
          <Box />
          <HStack>
            <Button onClick={() => setPage('tracker')}>Tracker</Button>
            <Button onClick={() => setPage('input')}>Input</Button>
          </HStack>
          <Box>
            <ColorModeSwitcher />
          </Box>
        </HStack>
        {page === 'tracker' && <Tracker />}
        {page === 'input' && <FishToJson />}
      </Container>
    </ChakraProvider>
  )
}
