import axios from 'axios';

// api.js 사라질 코드
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

// apiCall에는 요청하는 axios 함수 = 함수내에 헤더의 토큰값은 이 함수에서 넣어줌
// history는 useHistory를 가르키는 주소가 할당된 변수
export const TokenCheck = async (apiCall, history) => {
  const accessToken = localStorage.getItem('access-token');
  if (accessToken) {
    // token 체크 api
    const check = await client({
      method: 'GET',
      url: '/user/login-info',
      headers: {
        Authroization: accessToken,
      },
    });
    // check 값이 오류이면
    if (check.data.code === 419) {
      localStorage.removeItem('access-token');
      await client({
        method: 'GET',
        url: '/loss-leader/logout',
      });
      alert('로그인이 만료되었습니다. 다시 로그인하십시오.');
      history.push('/login');
    } else {
      // check 값이 올바르고 인자로 api 함수 안 넣었을때
      // 응답으로 넘어온 유저정보 넘겨줌
      if (check.data && apiCall === undefined) {
        return check;
      }
      // check 값 올바르고 인자로 실행시킬 apiCall 함수가 있을때
      else {
        // 넣어준 api 함수 실행
        const res = await apiCall(accessToken);
        return res;
      }
    }
  } else {
    await client({
      method: 'GET',
      url: '/loss-leader/logout',
    });
    alert('로그인이 만료되었습니다. 다시 로그인하십시오.');
    history.push('/login');
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

export const getDetail = async () => {
  try {
    const { data } = await axios.get('/data/newDetailData.json');
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
