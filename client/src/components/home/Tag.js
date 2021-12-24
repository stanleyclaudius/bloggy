import { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

const Tag = ({name, handleChoose, handleRemove}) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleClickTag = () => {
    if (!isSelected) {
      setIsSelected(true);
      handleChoose();
    } else {
      setIsSelected(false);
      handleRemove();
    }
  }

  return (
    <div className={`tag ${isSelected ? 'active' : ''}`} onClick={handleClickTag}>
      {name}
      {isSelected && <AiOutlineClose />}
    </div>
  );
}

export default Tag;