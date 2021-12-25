import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { GLOBAL_TYPES } from './../../redux/types/globalTypes';
import { updateProfile } from './../../redux/actions/userActions';
import Avatar from './../global/Avatar';

const UserProfile = ({id}) => {
  const [userData, setUserData] = useState({
    avatar: '',
    name: '',
    password: '',
    confirmPassword: ''
  });
  const [avatarPreview, setAvatarPreview] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useDispatch();
  const {auth, alert} = useSelector(state => state);

  const handleChange = e => {
    const {name, value} = e.target;
    setUserData({...userData, [name]: value});
  }

  const handleChangeImage = e => {
    const file = e.target.files[0];
    if (file.size > 1024 * 1024 * 2) {
      return dispatch({
        type: GLOBAL_TYPES.ALERT,
        payload: {
          errors: "Max image size is 2MB."
        }
      });
    }
    setAvatarPreview(file);
    setUserData({...userData, avatar: file});
  }

  const handleSubmit = e => {
    e.preventDefault();    
    const data = {name: userData.name ? userData.name : auth.user?.name};
    if (avatarPreview) {
      data.avatar = userData.avatar;
    }

    if (userData.password || userData.confirmPassword) {
      if (userData.password !== userData.confirmPassword) {
        return dispatch({
          type: GLOBAL_TYPES.ALERT,
          payload: {
            errors: 'Password confirmation doesn\'t match.'
          }
        });
      }
      data.password = userData.password;
    }
    dispatch(updateProfile(data, id, auth.token));
  }

  return (
    <form className='userProfile' onSubmit={handleSubmit}>
      <div className='userProfile__avatar'>
        <Avatar
          avatar={
            avatarPreview
            ? URL.createObjectURL(avatarPreview)
            : auth.user?.avatar
          }
          name={auth.user?.name}
        />
        <div className="inputGroup">
          <label htmlFor="avatar">Avatar</label>
          <input type="file" name="avatar" id="avatar" accept="image/*" onChange={handleChangeImage} />
        </div>
      </div>
      <div>
        <div className="inputGroup">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" defaultValue={auth.user?.name} onChange={handleChange} />
        </div>
        <div className="inputGroup">
          <label htmlFor="account">Email or Phone number</label>
          <input type="text" name="account" id="account" disabled defaultValue={auth.user?.account} style={{ background: "#3c3c3c" }} />
        </div>
        {
          auth.user?.type !== 'register' && 
          <p>
            Change password feature not available for user that login with {auth.user?.type}
          </p>
        }
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
            <input type={showConfirmPassword ? 'text' : 'password'} name='confirmPassword' id='confirmPassword' value={userData.confirmPassword} onChange={handleChange} />
            {
              showConfirmPassword
              ? <FaEyeSlash onClick={() => setShowConfirmPassword(false)} />
              : <FaEye onClick={() => setShowConfirmPassword(true)} />
            }
          </div>
        </div>
        <button className={alert.loading && 'disabled'} type='submit' disabled={alert.loading ? true : false}>
          {alert.loading ? 'Loading ...' : 'Update'}
        </button>
      </div>
    </form>
  );
}

export default UserProfile;