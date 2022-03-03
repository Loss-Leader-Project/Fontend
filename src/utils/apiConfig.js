//Post랑 Get, Update 에 따라 같은 함수를 호출하는데 인자랑 url에 따라 다르게 동작함

import axiosInstance from './apiInterceptors';

export const getApiRq = async (url, params) => {
  try {
    const res = await axiosInstance({
      method: 'GET',
      url,
      params,
    });
    return res.data;
  } catch (error) {
    const message = error.response.message ?? error.message ?? error;
    alert(message);
  }
};
//asd
export const postApiRq = async (url, data) => {
  try {
    const res = await axiosInstance({
      method: 'POST',
      url,
      data,
    });
    return res.data;
  } catch (error) {
    const message = error.response.message ?? error.message ?? error;
    alert(message);
  }
};

export const deleteApiRq = async (url, params) => {
  try {
    const res = await axiosInstance({
      method: 'DELETE',
      url,
      params,
    });
    return res.data;
  } catch (error) {
    const message = error.response.message ?? error.message ?? error;
    alert(message);
  }
};

export const updateApiRq = async (url, data) => {
  try {
    const res = await axiosInstance({
      method: 'UPDATE',
      url,
      data,
    });
    return res.data;
  } catch (error) {
    const message = error.response.message ?? error.message ?? error;
    alert(message);
  }
};
