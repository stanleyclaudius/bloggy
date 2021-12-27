import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { forgetPassword } from './../redux/actions/authActions';

const ForgetPassword = () => {
  const [account, setAccount] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {auth, alert} = useSelector(state => state);

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(forgetPassword(account));
  }

  useEffect(() => {
    if (auth.token) {
      navigate('/');
    }
  }, [auth, navigate]);

  return (
    <div className='forgetPassword container'>
      <h2>Forget Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="inputGroup">
          <label htmlFor="account">Email or Phone number</label>
          <input type="text" name="account" id="account" value={account} onChange={e => setAccount(e.target.value)} autoComplete='off' />
        </div>
        <button
          type="submit"
          disabled={alert.loading ? true : false}
          className={alert.loading && 'disabled'}
        >
          {alert.loading ? 'Loading ...' : 'Send'}
        </button>
      </form>
    </div>
  );
}

export default ForgetPassword;