import {
  Box,
  Heading,
  HStack,
  Spacer,
  Flex,
  Icon,
  Drawer,
  Button,
  DrawerOverlay,
  DrawerBody,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex
        p={{ base: '15px 35px', md: '15px 100px' }}
        bg='gray.700'
        color='white'
        alignItems='center'
      >
        <Box>
          <Heading fontSize={{ base: '20px', md: '25px' }}>
            <Link to='/'>
              Bloggy
            </Link>
          </Heading>
        </Box>
        <Spacer />
        <Box>
          <HStack
            spacing='10'
            d={{ base: 'none', md: 'flex' }}
          >
            <Link to='/' border='none' textDecoration='none'>Home</Link>
            <Link to='/category'>Category</Link>
            <Button
              bg='orange.400'
              variant='solid'
              _active={{ bg: 'orange.600' }}
              _hover={{ bg: 'orange.600' }}
            >
              Sign In
            </Button>
          </HStack>
          <Icon
            as={GiHamburgerMenu}
            cursor='pointer'
            d={{ base: 'block', md: 'none' }}
            onClick={onOpen} 
          />
        </Box>
      </Flex>

      <Drawer
        isOpen={isOpen}
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton color='white' />
          <DrawerBody
            pt='40px'
            bg='gray.700'
            color='white'
          >
            <Link to='/'>Home</Link>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default Navbar;