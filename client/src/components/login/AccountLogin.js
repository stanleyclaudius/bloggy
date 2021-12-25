import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GLOBAL_TYPES } from './../../redux/types/globalTypes';
import { login } from './../../redux/actions/authActions';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const AccountLogin = () => {
  const [userData, setUserData] = useState({
    account: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const {alert} = useSelector(state => state);
  
  const handleChange = e => {
    const {name, value} = e.target;
    setUserData({...userData, [name]: value});
  }

  const handleSubmit = e => {
    e.preventDefault();
    if (!userData.account || !userData.password) {
      return dispatch({
        type: GLOBAL_TYPES.ALERT,
        payload: {
          errors: 'Please fill up every field.'
        }
      })
    }
    dispatch(login(userData));
  }

  return (
    <form className='accountLogin' onSubmit={handleSubmit}>
      <div className="inputGroup">
        <label htmlFor="account">Email or Phone number</label>
        <input type="text" name="account" id="account" value={userData.account} onChange={handleChange} autoComplete='off' />
      </div>
      <div className="inputGroup">
        <label htmlFor="password">Password</label>
        <div>
          <div className="inputGroup--password">
            <input type={showPassword ? 'text' : 'password'} name="password" id="password" value={userData.password} onChange={handleChange} />
            {
              showPassword
              ? <FaEyeSlash onClick={() => setShowPassword(false)} />
              : <FaEye onClick={() => setShowPassword(true)} />
            }
          </div>
          <Link to='/' className='forgetPassword'>Forget password?</Link>
        </div>
      </div>
      <button type="submit" className={`${alert.loading ? 'disabled' : ''}`} disabled={alert.loading ? true : false}>
        {alert.loading ? 'Loading...' : 'Sign In'}
      </button>
    </form>
  );
}

export default AccountLogin;