import { useEffect } from 'react';
import { Box, createStandaloneToast } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

const Alert = () => {
  const toast = createStandaloneToast();

  const { alert } = useSelector(state => state);

  useEffect(() => {
    if (alert.success) {
      toast({
        position: 'top-right',
        title: 'Success.',
        description: `${alert.success}`,
        status: 'success',
        duration: 3000,
        isClosable: true
      });
    } else if (alert.errors) {
      toast({
        position: 'top-right',
        title: 'Failed.',
        description: `${alert.errors}`,
        status: 'error',
        duration: 3000,
        isClosable: true
      });
    }
  }, [alert, toast]);

  return (
    <Box></Box>
  );
}

export default Alert;