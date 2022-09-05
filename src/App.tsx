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
  IconButton,
} from '@chakra-ui/react'

// local
import FishToJson from './FishToJson'
import Tracker from './Tracker'
import { ColorModeSwitcher } from './ColorModeSwitcher'
import { FaGithub } from 'react-icons/fa'

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
          {process.env.NODE_ENV === 'development' && (
            <HStack>
              <Button onClick={() => setPage('tracker')}>Tracker</Button>
              <Button onClick={() => setPage('input')}>Input</Button>
            </HStack>
          )}
          <Box>
            <IconButton
              aria-label="Github Link"
              title="View on GitHub"
              variant="ghost"
              onClick={() =>
                window.open('https://github.com/ritlew/gw2-fisher')
              }
            >
              <FaGithub />
            </IconButton>
            <ColorModeSwitcher />
          </Box>
        </HStack>
        {page === 'tracker' && <Tracker />}
        {process.env.NODE_ENV === 'development' && page === 'input' && (
          <FishToJson />
        )}
      </Container>
    </ChakraProvider>
  )
}
