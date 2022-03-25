import React, { useEffect } from 'react';
import { naverClientId, naverRedirectURL, naverSecret } from '../../utils/OAuth';

const { naver } = window;

const LoginNaver = () => {
  const initializeNaverLogin = () => {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: naverClientId,
      callbackUrl: naverRedirectURL,
      clientSecret: naverSecret,
      isPopup: false, // popup 형식으로 띄울것인지 설정
      loginButton: { color: 'green', type: 3, height: '60' }, //버튼의 스타일, 타입, 크기를 지정
    });
    naverLogin.init();
  };

  useEffect(() => {
    initializeNaverLogin();
  }, []);

  return <div id='naverIdLogin' />;
};

export default LoginNaver;
