import axios from 'axios';

export const getPassword = async (id, birthday, email) => {
  try {
    const { data } = await axios({
      method: 'GET',
      url: '/getId',
      params: {
        id: id,
        birthday: birthday,
        email: email,
      },
    });

    return data;
  } catch (error) {
    const message = error.response.message ?? error.message ?? error;
    alert(message);
  }
};

export const postFindId = async props => {
  try {
    const data = axios({
      // method: 'POST',
      method: 'get',
      // url: '/user/login-id',
      url: '/data/findId.json',
      // data: {
      //   userName: props.name,
      //   birthDate: props.birthday,
      //   email: `${props.mailId}@${props.email}`,
      // },
    });
    return data;
  } catch (error) {
    const message = error.response.message ?? error.message ?? error;
    alert(message);
  }
};
