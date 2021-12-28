import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { verifyOtp } from './../../redux/actions/authActions';

const VerifyModal = ({isOpenModal, phone}) => {
  const [pin, setPin] = useState('');
  const [loading, setLoading] = useState(false);
  
  const dispatch = useDispatch();

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    await dispatch(verifyOtp(phone, pin));
    setLoading(false);
  }
  
  return (
    <div className={`verifyModal ${isOpenModal ? 'active' : ''}`}>
      <div className={`verifyModal__box ${isOpenModal ? 'active' : ''}`}>
        <div className="verifyModal__header">
          <h2>OTP Verification</h2>
        </div>
        <div className="verifyModal__footer">
          <form onSubmit={handleSubmit}>
            <div className="inputGroup">
              <label htmlFor="pin">OTP Code</label>
              <input type="text" name="pin" id="pin" value={pin} onChange={e => setPin(e.target.value)} />
            </div>
            <button className={`${loading ? 'disabled' : undefined}`} disabled={loading ? true : false} type="submit">
              {loading ? 'Loading ...' : 'Submit'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default VerifyModal;