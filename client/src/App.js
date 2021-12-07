import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PageRender from './PageRender';
import Navbar from './components/global/Navbar';
import Home from './pages/home';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/:page' element={<PageRender />} />
        <Route path='/:page/:slug' element={<PageRender />} />
      </Routes>
    </Router>
  );
}

export default App;