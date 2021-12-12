import { CATEGORY_TYPES } from './../types/categoryTypes';
import { GLOBAL_TYPES } from './../types/globalTypes';
import { getDataAPI, postDataAPI, patchDataAPI, deleteDataAPI } from './../../utils/fetchData';

export const getCategory = () => async(dispatch) => {
  try {
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        loading: true
      }
    });

    const res = await getDataAPI('category');
    dispatch({
      type: CATEGORY_TYPES.GET_CATEGORY,
      payload: res.data.categories
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

export const createCategory = (data, token) => {
  try {
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        loading: true
      }
    });

    const res = await postDataAPI('category', data, token);
    dispatch({
      type: CATEGORY_TYPES.CREATE_CATEGORY,
      payload: res.data.category
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

export const updateCategory = (data, id, token) => async(dispatch) => {
  try {
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        loading: true
      }
    });

    const res = await patchDataAPI(`category/${id}`, data, token);
    dispatch({
      type: CATEGORY_TYPES.UPDATE_CATEGORY,
      payload: res.data.category
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

export const deleteCategory = (id, token) => async(dispatch) => {
  try {
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        loading: true
      }
    });

    const res = await deleteDataAPI(`category/${id}`, token);
    dispatch({
      type: CATEGORY_TYPES.DELETE_CATEGORY,
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