import axios from 'axios';

export const getEmailCode = async email => {
  try {
    const { data } = await axios({
      method: 'GET',
      url: '/getEmailCode',
      params: {
        email: email,
      },
    });
    return data;
  } catch (error) {
    const message = error.response.message ?? error.message ?? error;
    alert(message);
  }
};

export const postSignUp = async props => {
  try {
    const { data } = await axios({
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
    return data;
  } catch (error) {
    const message = error.response.message ?? error.message ?? error;
    alert(message);
  }
};
