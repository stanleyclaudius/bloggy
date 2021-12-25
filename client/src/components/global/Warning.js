import { AiOutlineClose } from 'react-icons/ai';

const Warning = ({id, handleClick, handleClose}) => {
  const handleConfirm = async () => {
    await handleClick();
    handleClose();
  }

  return (
    <div className={`warning ${id && 'active'}`}>
      <div className={`warning__box ${id && 'active'}`}>
        <div className="warning__header">
          <h2>Delete Confirmation</h2>
          <AiOutlineClose onClick={handleClose} />
        </div>
        <div className="warning__body">
          <p>You can't undo your current action. Choose confirm if you sure to delete.</p>
          <div className="warning__utilBtn">
            <button onClick={handleClose}>Cancel</button>
            <button onClick={handleConfirm}>Confirm</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Warning;