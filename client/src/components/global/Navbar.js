import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import { FaSearch, FaUserAlt, FaSignOutAlt } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import { logout } from './../../redux/actions/authActions';
import Avatar from './Avatar';

const Navbar = () => {
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);
  const [isOpenAvatar, setIsOpenAvatar] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {auth} = useSelector(state => state);

  const handleLogout = () => {
    if (!auth.token) return;
    
    dispatch(logout(auth.token));
  }

  const redirectToLogin = () => {
    setIsOpenSidebar(false);
    navigate('/login');
  }

  return (
    <div className="navbar">
      <div className="navbar__main">
        <Link to='/'>
          <h2>Bloggy</h2>
        </Link>
        <div onClick={() => setIsOpenSidebar(!isOpenSidebar)}>
          <GiHamburgerMenu />
        </div>
      </div>
      <div className="navbar__search">
        <form>
          <input type="text" placeholder="Search article ..." />
          <FaSearch />
        </form>
      </div>
      <div className={`overlay ${isOpenSidebar ? 'active' : ''}`}>
        <div className={`navbar__links ${isOpenSidebar ? 'active' : ''}`}>
          <AiOutlineClose className='navbar__links--close' onClick={() => setIsOpenSidebar(false)} />
          <div className="clear"></div>
          <div className='navbar__links--link'>
            <Link onClick={() => setIsOpenSidebar(false)} to='/'>Home</Link>
            <p className='navbar__links--category'>Category</p>
            {
              auth.token
              ? (
                <>
                  <Link onClick={() => setIsOpenSidebar(false)} to='/create_blog'>Create Blog</Link>
                  <div className='navbar__links--avatar'>
                    <Avatar avatar={auth.user?.avatar} name={auth.user?.name} onClick={() => setIsOpenAvatar(!isOpenAvatar)} />
                    <div className={`navbar__links--avatarDropdown ${isOpenAvatar ? 'active' : ''}`}>
                      <Link to={`/profile/${auth.user?._id}`}>
                        <FaUserAlt />
                        Profile
                      </Link>
                      <Link to='/' onClick={handleLogout}>
                        <FaSignOutAlt />
                        logout
                      </Link>
                    </div>
                  </div>
                </>
              )
              : <button onClick={redirectToLogin}>Sign In</button>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;