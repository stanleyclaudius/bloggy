import { HOME_BLOG_TYPES } from './../types/homeBlogTypes';
import { GLOBAL_TYPES } from './../types/globalTypes';
import { getDataAPI } from './../../utils/fetchData';

export const getHomeBlogs = () => async(dispatch) => {
  try {
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        loading: true
      }
    });

    const res = await getDataAPI('blog');
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