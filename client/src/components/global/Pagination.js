import { Button, HStack, Flex } from '@chakra-ui/react';
import { useState } from 'react';

const Pagination = ({page, callback}) => {
  const [currPage, setCurrPage] = useState(1);

  const handlePagination = num => {
    setCurrPage(num);
    callback(num);
  }

  return (
    <HStack>
      <Button onClick={() => handlePagination(currPage - 1)}>&lt;</Button>
      <Flex>
        {
          [...Array(page)].map((_, i) => (
            <Button key={i} onClick={() => handlePagination(i+1)}>{i+1}</Button>
          ))
        }
      </Flex>
      <Button onClick={() => handlePagination(currPage + 1)}>&gt;</Button>
    </HStack>
  );
}

export default Pagination;