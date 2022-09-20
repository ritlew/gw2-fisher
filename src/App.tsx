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
import DayNightBar from './components/DayNightInfo'
import LinksFooter from './components/LinksFooter'
import { useLocalStorageState } from './hooks/useLocalStorage'
import {
  collectionOptions,
  CollectionName,
} from './components/selects/CollectionSelect'
import './index.css'

const theme = extendTheme({
  initialColorMode: 'dark',
})

const canthanCollections = [
  "Dragon's End Fisher",
  'Kaineng Fisher',
  'Seitung Province Fisher',
  'Echovald Wilds Fisher',
]

export const App = () => {
  const [caughtFish, hideFish, showFish] = useCaughtFish()
  const [collection, setCollection] = useLocalStorageState<CollectionName>(
    'collection',
    collectionOptions[0]
  )

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
          <Box display="flex" mt="0.5rem">
            <Box flex="1 1">
              <HStack>
                <Image src={`${process.env.PUBLIC_URL}/fishing.png`} />
                <Text fontSize="3xl" fontFamily="PT Serif">
                  GW2 Fisher
                </Text>
              </HStack>
            </Box>
            <Center flex="1 1">
              <DayNightBar
                canthanTime={canthanCollections.includes(collection)}
              />
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
          <Divider my="0.5rem" />
          <Box flexGrow="1" overflow="hidden">
            <Tracker
              collection={collection}
              onCollectionChange={setCollection}
            />
          </Box>
          <LinksFooter />
        </Container>
      </CaughtFishContext.Provider>
    </ChakraProvider>
  )
}
