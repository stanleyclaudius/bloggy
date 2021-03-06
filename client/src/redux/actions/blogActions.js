import { HOME_BLOG_TYPES } from './../types/homeBlogTypes';
import { CATEGORY_BLOG_TYPES } from './../types/categoryBlogTypes';
import { USER_BLOG_TYPES } from './../types/userBlogTypes';
import { BLOG_DETAIL_TYPES } from './../types/blogDetailTypes';
import { GLOBAL_TYPES } from './../types/globalTypes';
import { getDataAPI, postDataAPI, patchDataAPI, deleteDataAPI } from './../../utils/fetchData';
import { uploadImage } from './../../utils/imageHandler';
import { checkTokenValidity } from './../../utils/checkTokenValidity';

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

export const getUserBlogs = (id, num=1) => async(dispatch) => {
  try {
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        loading: true
      }
    });

    const res = await getDataAPI(`blog/user/${id}?limit=3&page=${num}`);
    dispatch({
      type: USER_BLOG_TYPES.GET_USER_BLOGS,
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

export const getBlogById = id => async(dispatch) => {
  try {
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        loading: true
      }
    });

    const res = await getDataAPI(`blog/${id}`);
    dispatch({
      type: BLOG_DETAIL_TYPES.GET_BLOG_DETAIL,
      payload: res.data.blog
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
  const tokenValidityResult = await checkTokenValidity(token, dispatch);
  const access_token = tokenValidityResult ? tokenValidityResult : token;

  try {
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        loading: true
      }
    });

    const thumbnail = await uploadImage(data.thumbnail, 'thumbnail');
    data.thumbnail = thumbnail.secure_url;

    const res = await postDataAPI('blog', data, access_token);

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

export const updateBlog = (data, id, token) => async(dispatch) => {
  const tokenValidityResult = await checkTokenValidity(token, dispatch);
  const access_token = tokenValidityResult ? tokenValidityResult : token;

  try {
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        loading: true
      }
    });
    
    let thumbnail = ''
    if (typeof data.thumbnail !== 'string') {
      thumbnail = await uploadImage(data.thumbnail, 'thumbnail');
      data.thumbnail = thumbnail.secure_url;
    }

    const res = await patchDataAPI(`blog/${id}`, data, access_token);
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

export const deleteBlog = (id, token) => async(dispatch) => {
  const tokenValidityResult = await checkTokenValidity(token, dispatch);
  const access_token = tokenValidityResult ? tokenValidityResult : token;

  try {
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {}
    });

    const res = await deleteDataAPI(`blog/${id}`, access_token);
    dispatch({
      type: USER_BLOG_TYPES.DELETE_USER_BLOG,
      payload: id
    });
    
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