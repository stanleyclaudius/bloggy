import {
  Box,
  Avatar,
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
  MenuDivider,
  Collapse,
  useDisclosure,
  createStandaloneToast
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from './../../redux/actions/authActions';
import { GiHamburgerMenu } from 'react-icons/gi';
import { FiChevronDown } from 'react-icons/fi';
import { FaUser } from 'react-icons/fa';
import { IoLogOut } from 'react-icons/io5';

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpenMenu, onToggle } = useDisclosure();

  const toast = createStandaloneToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {auth} = useSelector(state => state);

  const handleLogout = () => {
    dispatch(logout());
    toast({
      position: 'top-right',
      title: 'Success.',
      description: 'User sign out.',
      status: 'success',
      duration: 3000,
      isClosable: true
    });
  }

  return (
    <>
      <Flex
        p={{ base: '15px 35px', md: '15px 100px' }}
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
            spacing='4'
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
                bg='gray.700'
                borderColor='gray.600'
              >
                <MenuItem
                  _hover={{ bg: 'gray.600' }}
                  _active={{ bg: 'gray.600' }}
                >
                  Test
                </MenuItem>
              </MenuList>
            </Menu>
            {
              auth.token
              ? (
                <Menu>
                  <MenuButton
                    as={Button}
                    bg='transparent'
                    _hover={{ bg: 'transparent' }}
                    _active={{ bg: 'transparent' }}
                    _focus={{ outline: 'none' }}
                  >
                    <Avatar size='sm' name={auth.user.name} src={auth.user.avatar} />
                  </MenuButton>
                  <MenuList
                    zIndex='2'
                    bg='gray.700'
                    borderColor='gray.600'
                  >
                    <MenuItem
                      icon={<FaUser />}
                      _hover={{ bg: 'gray.600' }}
                      _active={{ bg: 'gray.600' }}
                      onClick={() => navigate(`/profile/${auth.user?._id}`)}
                    >
                      Profile
                    </MenuItem>
                    <MenuDivider />
                    <MenuItem
                      icon={<IoLogOut />}
                      _hover={{ bg: 'gray.600' }}
                      _active={{ bg: 'gray.600' }}
                      onClick={handleLogout}
                    >
                      Logout
                    </MenuItem>
                  </MenuList>
                </Menu>
              )
              : (
                <Button
                  bg='orange.400'
                  variant='solid'
                  _active={{ bg: 'orange.600' }}
                  _hover={{ bg: 'orange.600' }}
                  onClick={() => navigate('/login')}
                >
                  Sign In
                </Button>
              )
            }
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
              {
                auth.token
                ? (
                  <Menu>
                    <MenuButton
                      as={Button}
                      bg='transparent'
                      mt='15px'
                      p='0'
                      _hover={{ bg: 'transparent' }}
                      _active={{ bg: 'transparent' }}
                      _focus={{ outline: 'none' }}
                    >
                      <Avatar size='md' name={auth.user.name} src={auth.user.avatar} />
                    </MenuButton>
                    <MenuList
                      zIndex='2'
                      bg='gray.700'
                      borderColor='gray.600'
                    >
                      <MenuItem
                        icon={<FaUser />}
                        _hover={{ bg: 'gray.600' }}
                        _active={{ bg: 'gray.600' }}
                        onClick={() => navigate(`/profile/${auth.user?._id}`)}
                      >
                        Profile
                      </MenuItem>
                      <MenuDivider />
                      <MenuItem
                        icon={<IoLogOut />}
                        _hover={{ bg: 'gray.600' }}
                        _active={{ bg: 'gray.600' }}
                        onClick={handleLogout}
                      >
                        Logout
                      </MenuItem>
                    </MenuList>
                  </Menu>
                )
                : (
                  <Button
                    bg='orange.400'
                    variant='solid'
                    mt='15px'
                    _active={{ bg: 'orange.600' }}
                    _hover={{ bg: 'orange.600' }}
                    onClick={() => navigate('/login')}
                  >
                    Sign In
                  </Button>
                )
              }
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default Navbar;