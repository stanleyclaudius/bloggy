import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getHomeBlogs } from './../redux/actions/blogActions';
import ArticleContainer from './../components/home/ArticleContainer';
import Header from './../components/home/Header';
import Filter from './../components/home/Filter';
import Spinner from './../components/global/Spinner';
import Message from './../components/global/Message';

const Home = () => {
  const [filter, setFilter] = useState([]);

  const dispatch = useDispatch();
  const {homeBlog: blogCategory, alert, category} = useSelector(state => state);

  useEffect(() => {
    dispatch(getHomeBlogs(filter));
  }, [dispatch, filter]);

  return (
    <div className='container'>
      <Header />
      <Filter
        category={category}
        filter={filter}
        setFilter={setFilter}
      />
      <div className='home'>
        {
          alert.loading
          ? <Spinner />
          : (
            <>
              {
                blogCategory.length === 0
                ? (
                  <Message text="There's no blog found with this category." />
                )
                : (
                  <>
                    {
                      blogCategory.map(item => (
                        <div key={item._id}>
                          <div className='blogCategory'>
                            <h2 className='blogCategory--title'>{item.name}</h2>
                            {
                              item.count > 4 &&
                              <Link to={`/blogs/${item.name}`}>
                                See More
                              </Link>
                            }
                          </div>
                          <ArticleContainer blogs={item.blogs} />
                        </div>
                      ))
                    }
                  </>
                )
              }
            </>
          )
        }
      </div>
    </div>
  )
}

export default Home;