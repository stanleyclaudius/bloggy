import {
  Box,
  Heading,
  HStack,
  VStack,
  Spacer,
  Flex,
  Icon,
  Drawer,
  Button,
  DrawerOverlay,
  DrawerBody,
  DrawerContent,
  DrawerCloseButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Collapse,
  useDisclosure
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import { FiChevronDown } from 'react-icons/fi';

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpenMenu, onToggle } = useDisclosure();

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
            <Link to='/'>Home</Link>
            <Menu autoSelect={false}>
              <MenuButton
                as={Button}
                rightIcon={<FiChevronDown />}
                bg='transparent'
                fontWeight='normal'
                _hover={{ bg: 'transparent' }}
                _active={{ bg: 'transparent' }}
                _focus={{ outline: 'none' }}
              >
                Category
              </MenuButton>
              <MenuList
                zIndex='2'
                bg='gray.600'
                borderColor='gray.500'
              >
                <MenuItem
                  _hover={{ bg: 'gray.500' }}
                  _active={{ bg: 'gray.500' }}
                >
                  Test
                </MenuItem>
              </MenuList>
            </Menu>
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
            <Box mt='15px'>
              <Button
              p='0'
                rightIcon={<FiChevronDown />}
                bg='transparent'
                fontWeight='normal'
                _hover={{ bg: 'transparent' }}
                _active={{ bg: 'transparent' }}
                _focus={{ outline: 'none' }}
                onClick={onToggle}
              >
                Category
              </Button>
            </Box>
            <Collapse in={isOpenMenu}>
              <VStack
                bg='gray.600'
                borderRadius='5px'
                padding='10px'
                alignItems='flex-start'
                spacing='15px'
              >
                <Box>
                  <Link to='/'>HML</Link>
                </Box>
                <Box>
                  <Link to='/'>HML</Link>
                </Box>
                <Box>
                  <Link to='/'>HML</Link>
                </Box>
              </VStack>
            </Collapse>
            <Box>
              <Button
                bg='orange.400'
                variant='solid'
                mt='15px'
                _active={{ bg: 'orange.600' }}
                _hover={{ bg: 'orange.600' }}
              >
                Sign In
              </Button>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default Navbar;