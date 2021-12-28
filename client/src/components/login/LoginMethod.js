import { FaSms } from 'react-icons/fa';
import { BsKeyFill } from 'react-icons/bs';
import { MdAccountCircle } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { googleLogin, facebookLogin } from './../../redux/actions/authActions';
import { GOOGLE_CLIENT_ID } from './../../constant';
import GoogleLogin from 'react-google-login-lite';
import FacebookLogin from 'react-facebook-login-lite';

const LoginMethod = ({isSmsLogin, setIsSmsLogin}) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const onGoogleSuccess = response => {
    const id_token = response.getAuthResponse().id_token;
    dispatch(googleLogin(id_token));
  }

  const onFacebookSuccess = response => {
    const {accessToken, userID} = response.authResponse;
    dispatch(facebookLogin(accessToken, userID));
  }

  return (
    <div className='loginMethod'>
      <div>
        <GoogleLogin
          client_id={GOOGLE_CLIENT_ID}
          cookiepolicy='single_host_origin'
          onSuccess={onGoogleSuccess}
        />
      </div>

      <div>
        <FacebookLogin
          appId='485087349580137'
          onSuccess={onFacebookSuccess}
        />
      </div>

      <button onClick={() => setIsSmsLogin(!isSmsLogin)}>
        {
          isSmsLogin
          ? <BsKeyFill />
          : <FaSms />
        }
        Sign in with {isSmsLogin ? 'Bloggy Account' : 'SMS'}
      </button>

      <button onClick={() => navigate('/register')}>
        <MdAccountCircle />
        Register new account
      </button>
    </div>
  );
}

export default LoginMethod;