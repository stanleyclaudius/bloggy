import { HOME_BLOG_TYPES } from './../types/homeBlogTypes';
import { CATEGORY_BLOG_TYPES } from './../types/categoryBlogTypes';
import { GLOBAL_TYPES } from './../types/globalTypes';
import { getDataAPI, postDataAPI } from './../../utils/fetchData';
import { uploadImage } from './../../utils/imageHandler';

export const getHomeBlogs = filter => async(dispatch) => {
  let url = 'blog';
  if (filter.length > 0) {
    let queryStr = '';
    for (let i = 0; i < filter.length; i++) {
      if (i !== (filter.length - 1))
        queryStr += `category=${filter[i]._id}&`;
      else
        queryStr += `category=${filter[i]._id}`;
    }
    url = `${url}?${queryStr}`;
  }

  try {
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        loading: true
      }
    });

    const res = await getDataAPI(url);
    dispatch({
      type: HOME_BLOG_TYPES.GET_BLOGS,
      payload: res.data.blogs
    });

    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        loading: false
      }
    });
  } catch (err) {
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        errors: err.response.data.msg
      }
    });
  }
}

export const getCategoryBlogs = (id, page='?page=1') => async(dispatch) => {
  try {
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        loading: true
      }
    });

    const res = await getDataAPI(`blog/category/${id}${page}`);
    dispatch({
      type: CATEGORY_BLOG_TYPES.GET_BLOGS,
      payload: res.data
    });

    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        loading: false
      }
    });
  } catch (err) {
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        errors: err.response.data.msg
      }
    });
  }
}

export const createBlog = (data, token) => async(dispatch) => {
  try {
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        loading: true
      }
    });

    const thumbnail = await uploadImage(data.thumbnail, 'thumbnail');
    data.thumbnail = thumbnail.secure_url;

    const res = await postDataAPI('blog', data, token);

    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        success: res.data.msg
      }
    });
  } catch (err) {
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        errors: err.response.data.msg
      }
    });
  }
}