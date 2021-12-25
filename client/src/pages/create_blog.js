import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getDataAPI } from './../utils/fetchData';
import { createBlog, updateBlog } from './../redux/actions/blogActions';
import { GLOBAL_TYPES } from './../redux/types/globalTypes';
import { isContentChange } from './../utils/validator';
import ReactQuill from './../components/editor/ReactQuill';
import NotFound from './../components/global/NotFound';

const CreateBlog = ({id}) => {
  const [blogData, setBlogData] = useState({
    title: '',
    description: '',
    thumbnail: '',
    category: ''
  });
  const [body, setBody] = useState('');
  const [thumbnailPreview, setThumbnailPreview] = useState('');
  const [oldData, setOldData] = useState({});

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {auth, alert, category} = useSelector(state => state);

  const handleChange = e => {
    const {name, value} = e.target;
    setBlogData({...blogData, [name]: value});
  }

  const handleChangeImage = e => {
    const file = e.target.files[0];
    if (file.size > 1024 * 1024 * 2) {
      return dispatch({
        type: GLOBAL_TYPES.ALERT,
        payload: {
          errors: 'Maximum thumbnail size is 2MB.'
        }
      });
    }
    setThumbnailPreview(file);
    setBlogData({...blogData, thumbnail: file});
  }

  const handleSubmit = async e => {
    e.preventDefault();
    
    if (!blogData.title || !blogData.description || !body || !blogData.thumbnail || !blogData.category) {
      return dispatch({
        type: GLOBAL_TYPES.ALERT,
        payload: {
          errors: 'Please provide all field.'
        }
      });
    }

    if (blogData.title.length < 10 || blogData.title.length > 50) {
      return dispatch({
        type: GLOBAL_TYPES.ALERT,
        payload: {
          errors: 'Title length should be in range of 10 and 50 characters.'
        }
      });
    }

    if (blogData.description.length < 50 || blogData.description.length > 400) {
      return dispatch({
        type: GLOBAL_TYPES.ALERT,
        payload: {
          errors: 'Description length should be in range of 50 and 400 characters.'
        }
      });
    }

    if (body.length < 2000) {
      return dispatch({
        type: GLOBAL_TYPES.ALERT,
        payload: {
          errors: 'Content should be at least 2000 characters.'
        }
      });
    }

    const data = {
      ...blogData,
      content: body
    };

    if (id) {
      if (!isContentChange(data, oldData)) {
        await dispatch(updateBlog(data, id, auth.token));
      } else {
        return dispatch({
          type: GLOBAL_TYPES.ALERT,
          payload: {
            errors: 'Nothing changed on the blog.'
          }
        })
      }
    } else {
      await dispatch(createBlog(data, auth.token));
    }

    navigate(`/profile/${auth.user?._id}`);
  }

  useEffect(() => {
    if (!id) return;

    const fetchBlogData = async() => {
      await getDataAPI(`blog/${id}`)
        .then(res => {
          setBlogData(res.data.blog);
          setOldData(res.data.blog);
          setBody(res.data.blog.content);
        })
        .catch(err => {
          console.log(err);
        });
    }

    fetchBlogData();
  }, [id]);

  if (!auth.token) return <NotFound />
  return (
    <form className='createBlog container' onSubmit={handleSubmit}>
      <div className='createBlog__left'>
        <div className='createBlog__avatar'>
          {
            (thumbnailPreview || id) &&
            <img
              src={
                id
                ? thumbnailPreview
                  ? URL.createObjectURL(thumbnailPreview)
                  : blogData.thumbnail
                : thumbnailPreview
                  ? URL.createObjectURL(thumbnailPreview)
                  : ''
              }
              alt={`Bloggy - ${blogData.title}`}
            />
          }
          <div className="inputGroup">
            <label htmlFor="thumbnail">Thumbnail</label>
            <input type="file" name='thumbnail' id='thumbnail' onChange={handleChangeImage} accept="image/*" />
          </div>
        </div>
        <div className="inputGroup">
          <label htmlFor="title">Title</label>
          <input type="text" name="title" id="title" value={blogData.title} onChange={handleChange} />
        </div>
        <div className="inputGroup">
          <label htmlFor="description">Description</label>
          <textarea name="description" id="description" value={blogData.description} onChange={handleChange} />
        </div>
        <div className="inputGroup">
          <label htmlFor="category">Category</label>
          <select name="category" id="category" value={blogData.category} onChange={handleChange}>
            <option value="">- Select Category -</option>
            {
              category.map(item => (
                <option value={item._id}>{item.name}</option>
              ))
            }
          </select>
        </div>
      </div>
      <div className='createBlog__right'>
        <label htmlFor="content">Content</label>
        <ReactQuill body={body} setBody={setBody} />
        <button
          disabled={alert.loading ? true : false}
          className={`createBlog__submit ${alert.loading && 'disabled'}`}
          type="submit"
        >
          {alert.loading ? 'Loading ...' : 'Submit'}
        </button>
        <div className="clear"></div>
      </div>
    </form>
  );
}

export default CreateBlog;