//Post랑 Get, Update 에 따라 같은 함수를 호출하는데 인자랑 url에 따라 다르게 동작함

import axiosInstance from './apiInterceptors';
import { HTTPError } from './api';

export const ApiRq = async (method, url, params, data) => {
  try {
    const res = await axiosInstance({
      method,
      url,
      params,
      data,
    });
    return res.data;
  } catch (error) {
    const message = HTTPError.errorHandler(error);
    alert(message);
  }
};
