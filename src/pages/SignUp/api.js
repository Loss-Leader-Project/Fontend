import { client } from 'utils/api';

export const postSignUp = async props => {
  try {
    const res = await client({
      method: 'POST',
      url: '/lossleader-user',
      data: {
        loginId: props.id,
        password: props.password,
        confirmPassword: props.passwordCheck,
        userName: props.name,
        phoneNumber: props.phone,
        email: `${props.mailId}@${props.email}`,
        homeNumber: props.tel !== '' ? props.tel : null,
        postalCode: props.postNumber !== '' ? props.postNumber : null,
        briefAddress: props.address !== '' ? props.address : null,
        detailAddress: props.detailAddress !== '' ? props.detailAddress : null,
        birthDate: props.birthday,
        recommendedPerson: props.recommedId !== '' ? props.recommedId : null,
      },
    });
    return res;
  } catch (error) {
    const message = error.response.message ?? error.message ?? error;
    alert(message);
  }
};

export const emailRequest = async email => {
  try {
    const res = client({
      method: 'PATCH',
      url: '/lossleader-user',
      data: {
        email: email,
      },
    });
    return res;
  } catch (error) {
    const message = error.response.message ?? error.message ?? error;
    alert(message);
  }
};

export const emailValidRequest = async code => {
  try {
    const res = client({
      method: 'PUT',
      url: '/lossleader-user',
      data: {
        number: code,
      },
    });
    return res;
  } catch (error) {
    const message = error.response.message ?? error.message ?? error;
    alert(message);
  }
};

export const CheckIdSame = async id => {
  try {
    const res = client({
      method: 'GET',
      url: '/lossleader-user',
      params: {
        loginId: id,
      },
    });
    return res;
  } catch (error) {
    const message = error.response.message ?? error.message ?? error;
    alert(message);
  }
};
