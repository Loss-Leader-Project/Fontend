export const naverClientId = 'MrLhZGLeBYRF_Uy9YwY3';

export const naverRedirectURL = 'http://localhost:3000/login';

const kakaoClientId = '161c894276b2df1d4fd0d19aa9aebcb1';

const kakaoRedirectURL = 'http://localhost:3000/login';

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoClientId}&redirect_uri=${kakaoRedirectURL}&response_type=code&prompt=login`;

export const KAKAO_ALL_LOGOUT_URL = `https://kauth.kakao.com/oauth/logout?client_id=${kakaoClientId}&logout_redirect_uri=${kakaoRedirectURL}`;

export const KAKAO_LOGOUT_URL = `https://kauth.kakao.com/oauth/logout?client_id=${kakaoClientId}&logout_redirect_uri=${kakaoRedirectURL}`;
