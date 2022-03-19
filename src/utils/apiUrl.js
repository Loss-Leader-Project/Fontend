//BaseUrl 을 빼고 나머지 뒷부분 Url의 모듈
//변수명 규칙 : LOCAL or MOK + GET or POST + PageName + SubName

export const detailApiURL = {
  LOCAL_GET_DETAIL: '/store/detail',
  LOCAL_GET_REVIEW: '/review/listing-store/?storeId=1&page=0&size=20',
};

export const applyApiURL = {
  MOK_GET_APPLY_TITLE: '/data/applyTitle.json',
  LOCAL_GET_APPLY: '/data/applyData.json',
};

export const mainApiURL = {
  MOK_GET_HOTPLACE: '/data/mainfood-hotplace.json',
  MOK_GET_BESTREVIEW: '/data/mainfood-bestreview.json',
  LOCAL_GET_HOTPLACE: '/store/listing-hot',
  LOCAL_GET_BESTREVIEW: '/review/listing-hot',
};

export const loginApiURL = {
  LOCAL_POST_LOGIN: '/login',
  LOCAL_POST_SEARCHID: '/login/id',
  LOCAL_POST_SEARCHPW: '/login/password',
  LOCAL_GET_LOGIN_KAKAO: '/lossleader/callback/kakao',
  LOCAL_GET_LOGIN_NAVER: '/lossleader/callback/naver',
  LOCAL_GET_LOGIN_LOGOUT_KAKAO: '/logout/kakao',
  LOCAL_GET_LOGIN_LOGOUT: '/logout',
  LOCAL_GET_LOGIN_USERINFO: '/user/info',
};

export const signupApiURL = {
  LOCAL_GET_SIGNUP_IDCHECK: '/lossleader-user/loginid',
  LOCAL_POST_SIGNUP: '/lossleader-user',
  LOCAL_POST_SIGNUP_EMAILCHECK: '/lossleader-user/number',
  LOCAL_POST_SIGNUP_EMAILREQUEST: '/lossleader-user/email',
};

export const listApiURL = {
  GET_LIST: query => `/store/list/?${query}`,
};

/**
 * GET_USER_INFO 유저정보 가져오기
 * GET_USER_INFO_UPDATE 유저정보 수정
 * POST_CREATE_REVIEW 업체 리뷰 작성
 * GET_ORDERS 구매 정보
 * GET_COUPONS 쿠폰 정보
 * GET_REVIEWS 작성한 업체 리뷰
 * MOCK_GET_REVIEWS 업체 리뷰 목데이터
 */
export const myApiURL = {
  GET_USER_INFO: `/user/info`,
  GET_USER_INFO_UPDATE: `/user/info`,
  POST_CREATE_REVIEW: pathVariable => `/reviwe/${pathVariable}`,
  GET_BUYS: '/order/product/history',
  GET_COUPONS: '/data/coupons.json',
  GET_REVIEWS: (query = '') => `/review/listing-user?${query}`,
  MOCK_GET_REVIEWS: '/data/reviewData.json',
};
