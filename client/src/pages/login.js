import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginMethod from './../components/login/LoginMethod';
import AccountLogin from './../components/login/AccountLogin';
import SmsLogin from './../components/login/SmsLogin';

const Login = () => {
  const [isSmsLogin, setIsSmsLogin] = useState(false);

  const navigate = useNavigate();
  const {auth} = useSelector(state => state);

  useEffect(() => {
    if (auth.token) {
      navigate('/');
    }
  }, [auth.token, navigate]);

  return (
    <div className='login container'>
      <h1>Sign In</h1>
      <div className='login__content'>
        <LoginMethod isSmsLogin={isSmsLogin} setIsSmsLogin={setIsSmsLogin} />
        {isSmsLogin ? <SmsLogin /> : <AccountLogin />}
      </div>
    </div>
  );
}

export default Login;