import {
  Heading,
  VStack,
  Image,
  Text,
  Box,
} from '@chakra-ui/react';

const Header = () => {
  return (
    <VStack
      bg='gray.700'
      minH='400px'
      color='white'
      position='relative'
      alignItems='center'
      justifyContent='center'
      zIndex='1'
      padding='20px'
    >
      <Box
        position='absolute'
        top={{ base: '150px', md: '50px' }}
        right={{ base: '3%', md: '10%' }}
        zIndex='-1'
        d={{ base: 'none', sm: 'block' }}
      >
        <Image
          src={`${process.env.PUBLIC_URL}/images/squareliquid.png`}
          alt='Bloggy'
          width={{ base: '200px', md: '300px', sm: '150px' }}
        />
      </Box>
      <Heading fontSize='60px' pb='20px'>Bloggy</Heading>
      <Text textAlign='center' fontSize='18px'>Place where you can find and read article for free to improve your knowledge</Text>
      <Box
        position='absolute'
        top={{ base: '0', md: '-40px' }}
        left={{ base: '1%', md: '5%' }}
        zIndex='-1'
        d={{ base: 'none', sm: 'block' }}
      >
        <Image
          src={`${process.env.PUBLIC_URL}/images/circleliquid.png`}
          alt='Bloggy'
          width={{ base: '300px', md: '450px', sm: '220px' }}
        />
      </Box>
    </VStack>
  );
}

export default Header;