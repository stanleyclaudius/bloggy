import { HOME_BLOG_TYPES } from './../types/homeBlogTypes';
import { CATEGORY_BLOG_TYPES } from './../types/categoryBlogTypes';
import { GLOBAL_TYPES } from './../types/globalTypes';
import { getDataAPI } from './../../utils/fetchData';

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

export const getCategoryBlogs = id => async(dispatch) => {
  try {
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        loading: true
      }
    });

    const res = await getDataAPI(`blog/category/${id}`);
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