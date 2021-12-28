import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { GLOBAL_TYPES } from './../redux/types/globalTypes';
import { register } from './../redux/actions/authActions';
import HeadInfo from './../utils/HeadInfo';

const Register = () => {
  const [userData, setUserData] = useState({
    name: '',
    account: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {alert, auth} = useSelector(state => state);

  const handleChange = e => {
    const {name, value} = e.target;
    setUserData({...userData, [name]: value});
  }

  const handleSubmit = e => {
    e.preventDefault();
    if (!userData.name || !userData.account || !userData.password || !userData.confirmPassword) {
      return dispatch({
        type: GLOBAL_TYPES.ALERT,
        payload: {
          errors: 'Please fill up every field.'
        }
      });
    }

    if (userData.password.length < 8) {
      return dispatch({
        type: GLOBAL_TYPES.ALERT,
        payload: {
          errors: 'Password should be at least 8 characters.'
        }
      });
    }

    if (userData.password !== userData.confirmPassword) {
      return dispatch({
        type: GLOBAL_TYPES.ALERT,
        payload: {
          errors: 'Password confirmation should be matched.'
        }
      });
    }
    dispatch(register(userData));
  }

  useEffect(() => {
    if (auth.token) {
      navigate('/');
    }
  }, [auth.token, navigate]);

  return (
    <>
      <HeadInfo tilte='Bloggy - Register' />
      <div className='register'>
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div className="inputGroup">
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" value={userData.name} onChange={handleChange} autoComplete='off' />
          </div>
          <div className="inputGroup">
            <label htmlFor="account">Email or Phone number</label>
            <input type="text" name="account" id="account" value={userData.account} onChange={handleChange} autoComplete='off' />
          </div>
          <div className="inputGroup">
            <label htmlFor="password">Password</label>
            <div className="inputGroup--password">
              <input type={showPassword ? 'text' : 'password'} name="password" id="password" value={userData.password} onChange={handleChange} />
              {
                showPassword
                ? <FaEyeSlash onClick={() => setShowPassword(false)} />
                : <FaEye onClick={() => setShowPassword(true)} />
              }
            </div>
          </div>
          <div className="inputGroup">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="inputGroup--password">
              <input type={showConfirmPassword ? 'text' : 'password'} name="confirmPassword" id="confirmPassword" value={userData.confirmPassword} onChange={handleChange} />
              {
                showConfirmPassword
                ? <FaEyeSlash onClick={() => setShowConfirmPassword(false)} />
                : <FaEye onClick={() => setShowConfirmPassword(true)} />
              }
            </div>
          </div>
          <button className={alert.loading ? 'disabled' : ''} disabled={alert.loading ? true : false} type="submit">
            {alert.loading ? 'Loading ...' : 'Sign Up'}
          </button>
          <p>Already have an account? Click <Link to='/login'>here</Link></p>
        </form>
      </div>
    </>
  );
}

export default Register;