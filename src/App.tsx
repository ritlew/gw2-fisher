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
  Center,
  Divider,
} from '@chakra-ui/react'

// third party
import { FaGithub } from 'react-icons/fa'

// local
import Tracker from './pages/Tracker'
import { ColorModeSwitcher } from './components/ColorModeSwitcher'
import CaughtFishContext from './contexts/CaughtFishContext'
import useCaughtFish from './hooks/useCaughtFish'
import './index.css'
import DayNightBar from './components/DayNightInfo'

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
          <Box display="flex">
            <Box flex="1 1">
              <HStack>
                <Image src={`${process.env.PUBLIC_URL}/fishing.png`} />
                <Text fontSize="3xl" fontFamily="PT Serif">
                  GW2 Fisher
                </Text>
              </HStack>
            </Box>
            <Center flex="1 1">
              <DayNightBar />
            </Center>
            <Box
              display="flex"
              flex="1 1"
              alignItems="center"
              justifyContent="flex-end"
            >
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
          </Box>
          <Divider my={2} />
          <Box flexGrow="1" overflow="hidden">
            <Tracker />
          </Box>
        </Container>
      </CaughtFishContext.Provider>
    </ChakraProvider>
  )
}
