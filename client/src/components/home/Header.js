import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className='header container'>
      <div className="header__left">
        <h1>Discover articles with various topic all around the world</h1>
        <p>Bloggy is a place to show and find article or blog from all around the world with the best author's</p>
        <Link to='/register'>Sign Up</Link>
      </div>
      <div className="header__right">
        <img src={`${process.env.PUBLIC_URL}/images/header.png`} alt='Bloggy' />
      </div>
    </div>
  );
}

export default Header;