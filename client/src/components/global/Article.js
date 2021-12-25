import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { deleteBlog } from './../../redux/actions/blogActions';
import { GLOBAL_TYPES } from './../../redux/types/globalTypes';
import Warning from './../global/Warning';

const Article = ({id, category, title, description, author, date, image, isProfile}) => {
  const [onDelete, setOnDelete] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auth } = useSelector(state => state);

  const handleDelete = () => {
    if (auth.user?._id !== author._id) {
      return dispatch({
        type: GLOBAL_TYPES.ALERT,
        payload: {
          errors: 'Invalid authentication'
        }
      });
    }

    dispatch(deleteBlog(id, auth.token));
  }

  return (
    <div className='article'>
      <div className='article__left'>
        <p className='article__category'>Category: {category}</p>
        <Link to={`/blog/${id}`}>
          <h2 pb='12px' size={isProfile ? 'md' : 'lg'}>{title}</h2>
        </Link>
        <p className='article__description'>
          {
            description.length > 90
            ? description.slice(0, 90) + ' ...'
            : description
          }
        </p>
        <div className='article__footer'>
          {
            isProfile && (author._id === auth.user?._id) &&
            <div>
              <FaEdit onClick={() => navigate(`/update_blog/${id}`)} />
              <FaTrash onClick={() => setOnDelete(id)} />
            </div>
          }
          <div>
            <p className='article__author'>
              By: <Link to={`/profile/${author._id}`}>{author.name}</Link>
            </p>
            <p>{date}</p>
          </div>
        </div>
      </div>

      <div className='article__right'>
        <img src={image} alt={`Bloggy - ${title}`} />
      </div>

      <Warning
        id={onDelete}
        handleClick={handleDelete}
        handleClose={() => setOnDelete(null)}
      />
    </div>
  )
}

export default Article;