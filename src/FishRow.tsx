// react
import React from 'react'

// chakra ui
import { Tr, Td, VStack, Text, Image, Button, HStack } from '@chakra-ui/react'
import { CheckIcon, CloseIcon } from '@chakra-ui/icons'

// local
import Fish from './fish.interface'

export const getRarityColor = (
  rarity: Fish['rarity'],
  { text }: { text?: boolean } = {}
) => {
  switch (rarity) {
    default:
    case 'Basic':
      return '#AAA'
    case 'Fine':
      return '#62A4DA'
    case 'Masterwork':
      return '#1a9306'
    case 'Rare':
      return '#fcd00b'
    case 'Exotic':
      return '#ffa405'
    case 'Ascended':
      return '#fb3e8d'
    case 'Legendary':
      return text ? '#4C139D' : '#B181F7'
  }
}

export interface FishRowProps {
  fish: Fish
  hidden: boolean
  onHide: (name: string) => void
  onShow: (name: string) => void
}

const FishRow: React.FC<FishRowProps> = ({ fish, hidden, onHide, onShow }) => {
  return (
    <Tr display="table" w="100%" style={{ tableLayout: 'fixed' }}>
      <Td>
        {fish.img && (
          <Image
            border={`2px ${getRarityColor(fish.rarity, { text: true })} solid`}
            borderRadius="sm"
            w="40px"
            h="40px"
            src={fish.img}
          />
        )}
      </Td>
      <Td>
        <Text>{fish.name}</Text>
        <Text fontSize="xs" color={getRarityColor(fish.rarity)}>
          {fish.rarity}
        </Text>
      </Td>
      <Td>{fish.collection}</Td>
      <Td>{fish.bait}</Td>
      <Td>{fish.time}</Td>
      <Td>
        <VStack alignItems="flex-start">
          {fish.holes.map((hole) => (
            <Text key={hole}>{hole}</Text>
          ))}
        </VStack>
      </Td>
      <Td>
        <HStack justifyContent="end">
          <Button
            onClick={() => {
              window.open(
                `https://wiki.guildwars2.com/wiki/${fish.name.replace(
                  ' ',
                  '_'
                )}`
              )
            }}
          >
            Wiki
          </Button>
          <Button
            colorScheme={hidden ? 'red' : 'blue'}
            leftIcon={hidden ? <CloseIcon /> : <CheckIcon />}
            onClick={() => (hidden ? onShow(fish.name) : onHide(fish.name))}
          >
            {hidden ? 'Unhide' : 'Catch'}
          </Button>
        </HStack>
      </Td>
    </Tr>
  )
}

export default FishRow
