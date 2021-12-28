import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginMethod from './../components/login/LoginMethod';
import AccountLogin from './../components/login/AccountLogin';
import SmsLogin from './../components/login/SmsLogin';
import HeadInfo from './../utils/HeadInfo';

const Login = () => {
  const [queryParams] = useSearchParams();
  const [isSmsLogin, setIsSmsLogin] = useState(false);

  const navigate = useNavigate();
  const {auth} = useSelector(state => state);

  useEffect(() => {
    if (auth.token) {
      if (queryParams.get('blog')) {
        navigate(`/blog/${queryParams.get('blog')}`);
      } else {
        navigate('/');
      }
    }
  }, [auth.token, navigate, queryParams]);

  return (
    <>
      <HeadInfo title='Bloggy - Login' />
      <div className='login container'>
        <h1>Sign In</h1>
        <div className='login__content'>
          <LoginMethod isSmsLogin={isSmsLogin} setIsSmsLogin={setIsSmsLogin} />
          {isSmsLogin ? <SmsLogin /> : <AccountLogin />}
        </div>
      </div>
    </>
  );
}

export default Login;