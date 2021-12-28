import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { GLOBAL_TYPES } from './../../redux/types/globalTypes';
import { resetPassword } from './../../redux/actions/authActions';
import HeadInfo from './../../utils/HeadInfo';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {slug} = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {auth, alert} = useSelector(state => state);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!password || !confirmPassword)
      return dispatch({
        type: GLOBAL_TYPES.ALERT,
        payload: {
          errors: 'Please filled every field.'
        }
      });

    if (password !== confirmPassword)
      return dispatch({
        type: GLOBAL_TYPES.ALERT,
        payload: {
          errors: 'Password confirmation doesn\'t match.'
        }
      });
      
    await dispatch(resetPassword(password, slug));
    navigate('/login');
  }

  useEffect(() => {
    if (auth.token) {
      navigate('/');
    }
  }, [auth, navigate]);

  return (
    <>
      <HeadInfo title='Bloggy - Reset Password' />
      <div className='resetPassword container'>
        <h2>Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="inputGroup">
            <label htmlFor="password">Password</label>
            <div className="inputGroup--password">
              <input type={showPassword ? 'text' : 'password'} name="password" id="password" value={password} onChange={e => setPassword(e.target.value)} />
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
              <input type={showConfirmPassword ? 'text' : 'password'} name="confirmPassword" id="confirmPassword" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
              {
                showConfirmPassword
                ? <FaEyeSlash onClick={() => setShowConfirmPassword(false)} />
                : <FaEye onClick={() => setShowConfirmPassword(true)} />
              }
            </div>
          </div>
          <button
            type="submit"
            disabled={alert.loading ? true : false}
            className={alert.loading ? 'disabled' : undefined}
          >
            {alert.loading ? 'Loading ...' : 'Submit'}
          </button>
        </form>
      </div>
    </>
  );
}

export default ResetPassword;