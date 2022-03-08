import { client } from 'utils/api';

export const fetchHotList = async (randomNum, setItems) => {
  try {
    const { data } = await client.get(`/data/mainfood-hotplace.json`);
    setItems([data.data[randomNum.num1], data.data[randomNum.num2], data.data[randomNum.num3]]);
  } catch (error) {
    const message = error.response.message ?? error.message ?? error;
    alert(message);
  }
};

export const fetchBestreviewList = async (randomNum, setItems) => {
  try {
    const { data } = await client.get(`/data/mainfood-bestreview.json`);
    setItems([data.data[randomNum.num1], data.data[randomNum.num2], data.data[randomNum.num3]]);
  } catch (error) {
    const message = error.response.message ?? error.message ?? error;
    alert(message);
  }
};