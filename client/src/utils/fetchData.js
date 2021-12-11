import axios from 'axios';

export const getDataAPI = async(url, token) => {
  const res = await axios.get(`/api/v1/${url}`, {
    headers: {
      Authorization: token
    }
  });

  return res;
}

export const postDataAPI = async(url, data, token) => {
  const res = await axios.post(`/api/v1/${url}`, data, {
    headers: {
      Authorization: token
    }
  });

  return res;
}

export const patchDataAPI = async(url, data, token) => {
  const res = await axios.patch(`/api/v1/${url}`, data, {
    headers: {
      Authorization: token
    }
  });

  return res;
}

export const deleteDataAPI = async(url, token) => {
  const res = await axios.delete(`/api/v1/${url}`, {
    headers: {
      Authorization: token
    }
  });

  return res;
}