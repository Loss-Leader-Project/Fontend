import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});
/*
 * api 예시
 */
// export const getSignUp = () => client.get('/api/signUp',{
//   headers:{
//     "X-AUTH-TOKEN":accesstoken
//   }
// });

export const getData = async url => {
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    const message = error.response.message ?? error.message ?? error;
    alert(message);
  }
};
