// react
import React from 'react'

// chakra ui
import { Tr, Td, VStack, Text, Image, Button, HStack } from '@chakra-ui/react'
import { CheckIcon, CloseIcon } from '@chakra-ui/icons'

// local
import Fish from './fish.interface'

const getRarityColor = (
  rarity: Fish['rarity'],
  { text }: { text?: boolean } = {}
) => {
  switch (rarity) {
    default:
    case 'Basic':
      return '#AAA'
      break
    case 'Common':
      return '#62A4DA'
      break
    case 'Masterwork':
      return '#1a9306'
      break
    case 'Rare':
      return '#fcd00b'
      break
    case 'Exotic':
      return '#ffa405'
      break
    case 'Ascended':
      return '#fb3e8d'
      break
    case 'Legendary':
      return text ? '#4C139D' : '#B181F7'
      break
  }
}

interface FishListItemProps {
  fish: Fish
  hidden?: boolean
  onHide: (name: string) => void
  onShow: (name: string) => void
}

const FishListItem: React.FC<FishListItemProps> = ({
  fish,
  hidden,
  onHide,
  onShow,
}) => {
  return (
    <Tr>
      <Td>
        {fish.img && (
          <Image
            border={`2px ${getRarityColor(fish.rarity, { text: true })} solid`}
            borderRadius="sm"
            w="40px"
            h="40px"
            src={`${process.env.PUBLIC_URL}/fish-images/${fish.img}`}
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

export default FishListItem
