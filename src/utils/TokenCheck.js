// apiCall에는 요청하는 axios 함수 = 함수내에 헤더의 토큰값은 이 함수에서 넣어줌

import { ApiRq } from './apiConfig';
import { loginApiURL } from './apiUrl';

// history는 useHistory를 가르키는 주소가 할당된 변수
const TokenCheck = async (apiCall, history) => {
  const accessToken = localStorage.getItem('access-token');
  if (accessToken) {
    // token 체크 api
    try {
      const check = await ApiRq('get', loginApiURL.LOCAL_GET_LOGIN_USERINFO, null, null, {
        Authorization: accessToken,
      });
      if (check.data && apiCall === null) {
        return check;
      }
      // check 값 올바르고 인자로 실행시킬 apiCall 함수가 있을때
      else {
        // 넣어준 api 함수 실행
        const res = await apiCall(accessToken);
        return res;
      }
    } catch (error) {
      if (error.data.code === 419) {
        localStorage.removeItem('access-token');
        await ApiRq('get', loginApiURL.LOCAL_GET_LOGIN_LOGOUT);
        alert('로그인이 만료되었습니다. 다시 로그인하십시오.');
        history.push('/login');
      }
    }
  } else {
    await ApiRq('get', loginApiURL.LOCAL_GET_LOGIN_LOGOUT);
    alert('로그인이 만료되었습니다. 다시 로그인하십시오.');
    history.push('/login');
  }
};

export default TokenCheck;
