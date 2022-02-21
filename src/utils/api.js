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

export const fetchHotList = async (randomNum, setItems) => {
  try {
    const { data } = await axios.get(`/data/mainfood-hotplace.json`);
    setItems([data.data[randomNum.num1], data.data[randomNum.num2], data.data[randomNum.num3]]);
  } catch (error) {
    const message = error.response.message ?? error.message ?? error;
    alert(message);
  }
};

export const fetchBestreviewList = async (randomNum, setItems) => {
  try {
    const { data } = await axios.get(`/data/mainfood-bestreview.json`);
    setItems([data.data[randomNum.num1], data.data[randomNum.num2], data.data[randomNum.num3]]);
  } catch (error) {
    const message = error.response.message ?? error.message ?? error;
    alert(message);
  }
};
