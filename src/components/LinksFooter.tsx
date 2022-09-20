// react
import React from 'react'

// chakra ui
import {
  Center,
  Text,
  HStack,
  Tag,
  TagLeftIcon,
  TagLabel,
  Image,
  Link,
  useToast,
} from '@chakra-ui/react'

// third party
import { FaDiscord, FaGithub } from 'react-icons/fa'

interface LinksFooterProps {}

const LinksFooter: React.FC<LinksFooterProps> = ({}) => {
  const toast = useToast()

  console.log(process.env)

  return (
    <Center my="0.5rem">
      <HStack>
        <Text fontSize="sm">Version {process.env.REACT_APP_VERSION}</Text>
        <Text>·</Text>
        <Text fontSize="sm">Made by</Text>
        <Tag
          as={Link}
          onClick={() => {
            toast({
              title: 'Account name copied to clipboard!',
              duration: 2000,
              isClosable: true,
            })
            window.navigator.clipboard.writeText('RitLew.1954')
          }}
        >
          <Image
            boxSize="14px"
            mr="1"
            src={`${process.env.PUBLIC_URL}/gw2.ico`}
          />
          <TagLabel>RitLew.1954</TagLabel>
        </Tag>
        <Tag
          as={Link}
          onClick={() => {
            toast({
              title: 'Account name copied to clipboard!',
              duration: 2000,
              isClosable: true,
            })
            window.navigator.clipboard.writeText('ritlew#5260')
          }}
        >
          <TagLeftIcon as={FaDiscord} />
          <TagLabel>ritlew#5260</TagLabel>
        </Tag>
        <Tag
          as={Link}
          onClick={() => window.open('https://github.com/ritlew/gw2-fisher')}
        >
          <TagLeftIcon as={FaGithub} />
          <TagLabel>ritlew</TagLabel>
        </Tag>
      </HStack>
    </Center>
  )
}

export default LinksFooter
