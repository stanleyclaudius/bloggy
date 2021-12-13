import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { refreshToken } from './redux/actions/authActions';
import { getCategory } from './redux/actions/categoryActions';
import PageRender from './PageRender';
import Navbar from './components/global/Navbar';
import Alert from './components/global/Alert';
import Home from './pages/home';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategory());
    dispatch(refreshToken());
  }, [dispatch]);

  return (
    <Router>
      <Navbar />
      <Alert />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/:page' element={<PageRender />} />
        <Route path='/:page/:slug' element={<PageRender />} />
      </Routes>
    </Router>
  );
}

export default App;