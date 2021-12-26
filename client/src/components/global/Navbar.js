import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdOutlineAccountTree } from 'react-icons/md';
import { FaSearch, FaUserAlt, FaSignOutAlt } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import { getDataAPI } from './../../utils/fetchData';
import { logout } from './../../redux/actions/authActions';
import Avatar from './Avatar';

const Navbar = () => {
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);
  const [isOpenAvatar, setIsOpenAvatar] = useState(false);
  const [search, setSearch] = useState('');
  const [blogs, setBlogs] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {pathname} = useLocation();
  const {auth} = useSelector(state => state);

  const handleLogout = () => {
    if (!auth.token) return;
    setIsOpenAvatar(false);
    dispatch(logout(auth.token));
  }

  const redirectToLogin = () => {
    setIsOpenSidebar(false);
    navigate('/login');
  }

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (!search) return setBlogs([]);

      if (search.length > 2) {
        getDataAPI(`blog/search?title=${search}`)
          .then(res => setBlogs(res.data.blogs));
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [search]);

  useEffect(() => {
    setBlogs([]);
    setSearch('');
  }, [pathname]);

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
          <input type="text" placeholder="Search article ..." value={search} onChange={e => setSearch(e.target.value)} />
          <FaSearch />
        </form>
        {
          search.length > 2 &&
          <div className='navbar__searchContainer'>
            {
              blogs.length > 0
              ? (
                <>
                  {
                    blogs.length > 0 &&
                    blogs.map(blog => (
                      <div key={blog._id} className='navbar__searchResult'>
                        <div className='navbar__searchResult--left'>
                          <h2>
                            <Link to={`/blog/${blog._id}`}>
                              {blog.title}
                            </Link>
                          </h2>
                          <p>{blog.description}</p>
                          <p>{new Date(blog.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div className='navbar__searchResult--right'>
                          <img src={blog.thumbnail} alt={blog.title} />
                        </div>
                      </div>
                    ))
                  }
                </>
              )
              : (
                <h3 style={{ textAlign: 'center' }}>No blogs found</h3>
              )
            }
          </div>
        }
      </div>
      <div className={`overlay ${isOpenSidebar ? 'active' : ''}`}>
        <div className={`navbar__links ${isOpenSidebar ? 'active' : ''}`}>
          <AiOutlineClose className='navbar__links--close' onClick={() => setIsOpenSidebar(false)} />
          <div className="clear"></div>
          <div className='navbar__links--link'>
            <p className='navbar__links--home'><Link onClick={() => setIsOpenSidebar(false)} to='/'>Home</Link></p>
            {
              auth.token
              ? (
                <>
                  <Link onClick={() => setIsOpenSidebar(false)} to='/create_blog'>Create Blog</Link>
                  <div className='navbar__links--avatar'>
                    <Avatar avatar={auth.user?.avatar} name={auth.user?.name} onClick={() => setIsOpenAvatar(!isOpenAvatar)} />
                    <div className={`navbar__links--avatarDropdown ${isOpenAvatar ? 'active' : ''}`}>
                      <Link to={`/profile/${auth.user?._id}`} onClick={() => setIsOpenAvatar(false)}>
                        <FaUserAlt />
                        Profile
                      </Link>
                      {
                        auth.user?.role === 'admin' &&
                        <Link to='/category' onClick={() => setIsOpenAvatar(false)}>
                          <MdOutlineAccountTree />
                          Category
                        </Link>
                      }
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