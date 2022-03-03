//api의 기본 세팅 instance 부분
//interceptor는 응답받은 부분을 미리 캐치해서 에러 헨들링하는 거

import axios from 'axios';
import { API_ENDPOINT } from 'utils/apiBaseUrl';
import { HTTPError } from './api';

const axiosInstance = axios.create({
  baseURL: API_ENDPOINT, //baseURL 미리세팅
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.response.use(
  response => Promise.resolve(response),
  axiosError => Promise.reject(new HTTPError(axiosError.status))
);

export default axiosInstance;
