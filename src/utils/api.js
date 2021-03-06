import axios from 'axios';

export const client = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

client.interceptors.response.use(
  response => Promise.resolve(response),
  axiosError => Promise.reject(axiosError)
);

export const getData = async url => {
  try {
    const res = await client.get(url);
    return res;
  } catch (error) {
    const message = error.response.message ?? error.message ?? error;
    alert(message);
  }
};

export const checkAccessToken = () => {
  if (localStorage.getItem('access-token')) {
    return true;
  } else {
    return false;
  }
};

const BASE_URL = '/data/';

export const getReviews = async (order = 'createdAt', offset = 0, limit = 5) => {
  try {
    const query = `order=${order}&offset=${offset}&limit=${limit}`;
    const { data } = await axios.get(`${BASE_URL}/detail/review?${query}`);
    return data;
  } catch (error) {
    const message = error.response.message ?? error.message ?? error;
    alert(message);
  }
};

export const getMokReviews = async () => {
  try {
    const { data } = await axios.get('/data/reviewData.json');
    return data;
  } catch (error) {
    const message = error.response.message ?? error.message ?? error;
    alert(message);
  }
};

export const getProductDetail = async () => {
  try {
    const { data } = await axios.get('/data/DetailData.json');
    return data;
  } catch (error) {
    const message = error.response.message ?? error.message ?? error;
    alert(message);
  }
};

export const getApply = async () => {
  try {
    const { data } = await axios({
      method: 'GET',
      url: '/data/applyData.json',
    });
    return data;
  } catch (error) {
    const message = error.response.message ?? error.message ?? error;
    alert(message);
  }
};

export const getApplyTitle = async () => {
  try {
    const { data } = await axios({
      method: 'GET',
      url: '/data/applyTitle.json',
    });
    return data;
  } catch (error) {
    const message = error.response.message ?? error.message ?? error;
    alert(message);
  }
};

export const postApply = async props => {
  const { userId, productId, userName, phoneNumber, visitTime, visitCount, mileage, agreeUserInfo } = props;
  try {
    const { data } = await axios({
      method: 'POST',
      url: '',
      data: { userName, phoneNumber, visitTime, visitCount, mileage, agreeUserInfo },
    });
    return data;
  } catch (error) {
    const message = error.response.message ?? error.message ?? error;
    alert(message);
  }
};
