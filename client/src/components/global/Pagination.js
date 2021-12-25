import { useState } from 'react';

const Pagination = ({page, callback}) => {
  const [currPage, setCurrPage] = useState(1);

  const handlePagination = num => {
    setCurrPage(num);
    callback(num);
  }

  return (
    <div className='pagination'>
      {
        currPage > 1 &&
        <button onClick={() => handlePagination(currPage - 1)}>&lt;</button>
      }
      
      <div>
        {
          [...Array(page)].map((_, i) => (
            <button key={i} className={currPage === i + 1 && 'active'} onClick={() => handlePagination(i+1)}>{i+1}</button>
          ))
        }
      </div>

      {
        currPage !== page &&
        <button onClick={() => handlePagination(currPage + 1)}>&gt;</button>
      }
    </div>
  );
}

export default Pagination;