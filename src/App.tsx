// react
import React from 'react'

// chakra ui
import {
  ChakraProvider,
  extendTheme,
  Container,
  Box,
  Image,
  Text,
  HStack,
  IconButton,
} from '@chakra-ui/react'

// third party
import { FaGithub } from 'react-icons/fa'

// local
import Tracker from './pages/Tracker'
import { ColorModeSwitcher } from './components/ColorModeSwitcher'
import CaughtFishContext from './contexts/CaughtFishContext'
import useCaughtFish from './hooks/useCaughtFish'
import './index.css'

const theme = extendTheme({
  initialColorMode: 'dark',
})

export const App = () => {
  const [caughtFish, hideFish, showFish] = useCaughtFish()

  return (
    <ChakraProvider theme={theme}>
      <CaughtFishContext.Provider value={{ caughtFish, showFish, hideFish }}>
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
            <Tracker />
          </Box>
        </Container>
      </CaughtFishContext.Provider>
    </ChakraProvider>
  )
}
