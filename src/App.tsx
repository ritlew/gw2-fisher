import React, { useState } from 'react'
import {
  ChakraProvider,
  extendTheme,
  Box,
  Center,
  SimpleGrid,
  Button,
} from '@chakra-ui/react'
import FishToJson from './FishToJson'
import Tracker from './Tracker'

const theme = extendTheme({ initialColorMode: 'dark' })

export const App = () => {
  const [page, setPage] = useState<'tracker' | 'input'>('tracker')

  return (
    <ChakraProvider theme={theme}>
      <Box pt={4}>
        <Center>
          <SimpleGrid columns={2} spacing={4}>
            <Button onClick={() => setPage('tracker')}>Tracker</Button>
            <Button onClick={() => setPage('input')}>Input</Button>
          </SimpleGrid>
        </Center>
        {page === 'tracker' && <Tracker />}
        {page === 'input' && <FishToJson />}
      </Box>
    </ChakraProvider>
  )
}
