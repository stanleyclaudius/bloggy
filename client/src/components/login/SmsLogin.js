import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { smsLogin } from './../../redux/actions/authActions';
import { AiOutlinePlus } from 'react-icons/ai';
import VerifyModal from './VerifyModal';
import { GLOBAL_TYPES } from './../../redux/types/globalTypes';

const SmsLogin = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [phone, setPhone] = useState('');

  const dispatch = useDispatch();
  const {alert} = useSelector(state => state);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!phone) {
      return dispatch({
        type: GLOBAL_TYPES.ALERT,
        payload: {
          errors: 'Please provide your phone number'
        }
      });
    }
    await dispatch(smsLogin(phone));
    setIsOpenModal(true);
  }

  return (
    <>
      <form className="accountLogin" onSubmit={handleSubmit}>
        <div className="inputGroup">
          <label htmlFor="phone">Phone number</label>
          <div className="inputGroup--phone">
            <div><AiOutlinePlus /></div>
            <input type="text" id="phone" name="phone" value={phone} onChange={e => setPhone(e.target.value)} autoComplete='off' />
          </div>
        </div>
        <button className={`${alert.loading ? 'disabled' : undefined}`} disabled={alert.loading ? true : false} type="submit">
          {alert.loading ? 'Loading ...' : 'Sign In'}
        </button>
      </form>

      {
        isOpenModal && <VerifyModal isOpenModal={isOpenModal} phone={phone} />
      }
    </>
  );
}

export default SmsLogin;