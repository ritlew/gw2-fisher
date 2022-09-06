// react
import React, { useState } from 'react'

// chakra ui
import {
  ChakraProvider,
  extendTheme,
  Container,
  Box,
  Image,
  Text,
  Button,
  HStack,
  IconButton,
} from '@chakra-ui/react'

// third party
import { FaGithub } from 'react-icons/fa'

// local
import FishToJson from './FishToJson'
import Tracker from './Tracker'
import { ColorModeSwitcher } from './ColorModeSwitcher'
import './index.css'

const theme = extendTheme({
  initialColorMode: 'dark',
})

export const App = () => {
  const [page, setPage] = useState<'tracker' | 'input'>('tracker')

  return (
    <ChakraProvider theme={theme}>
      <Container
        display="flex"
        flexDir="column"
        maxW="container.xl"
        maxH="100%"
        h="100%"
      >
        <HStack pt={4} justifyContent="space-between">
          <Box />
          <HStack>
            <Image src={`${process.env.PUBLIC_URL}/fishing.png`} />
            <Text fontSize="3xl" fontFamily="PT Serif">
              GW2 Fisher
            </Text>
          </HStack>
          {process.env.NODE_ENV === 'development' && false && (
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
        <Box flexGrow="1" overflow="hidden">
          {page === 'tracker' && <Tracker />}
          {process.env.NODE_ENV === 'development' && page === 'input' && (
            <FishToJson />
          )}
        </Box>
      </Container>
    </ChakraProvider>
  )
}
