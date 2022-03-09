import { client } from 'utils/api';

export const getPassword = async (id, birthday, email) => {
  try {
    const res = await client({
      method: 'POST',
      url: '/user/login-password',
      data: {
        loginId: id,
        birthDate: birthday,
        email: email,
      },
    });

    return res;
  } catch (error) {
    const message = error.response.message ?? error.message ?? error;
    alert(message);
  }
};

export const postFindId = async props => {
  try {
    const res = client({
      method: 'POST',
      url: '/user/login-id',
      data: {
        userName: props.name,
        birthDate: props.birthday,
        email: `${props.mailId}@${props.email}`,
      },
    });
    return res;
  } catch (error) {
    const message = error.response.message ?? error.message ?? error;
    alert(message);
  }
};

export const Login = async (id, password) => {
  try {
    const res = client({
      method: 'POST',
      url: '/login',
      data: {
        loginId: id,
        password: password,
      },
    });

    return res;
  } catch (error) {
    const message = error.response.message ?? error.message ?? error;
    alert(message);
  }
};
