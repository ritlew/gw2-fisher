// react
import React, { useContext } from 'react'

// chakra ui
import { Tr, Td, VStack, Text, Image, Button, HStack } from '@chakra-ui/react'
import { CheckIcon, CloseIcon } from '@chakra-ui/icons'

// local
import Fish from '../fish.interface'
import { getRarityColor } from '../data/fish'
import CaughtFishContext from '../contexts/CaughtFishContext'

export interface FishRowProps {
  fish: Fish
}

const FishRow: React.FC<FishRowProps> = ({ fish }) => {
  const { caughtFish, hideFish, showFish } = useContext(CaughtFishContext)

  const hidden = caughtFish.includes(fish.id)

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
            onClick={() => (hidden ? showFish(fish.id) : hideFish(fish.id))}
          >
            {hidden ? 'Unhide' : 'Catch'}
          </Button>
        </HStack>
      </Td>
    </Tr>
  )
}

export default FishRow
