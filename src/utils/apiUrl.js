//BaseUrl 을 빼고 나머지 뒷부분 Url의 모듈
//변수명 규칙 : LOCAL or MOK + GET or POST + PageName + SubName

export const detailApiURL = {
  LOCAL_GET_DETAIL: '/data/newDetailData.json',
};

export const applyApiURL = {
  MOK_GET_APPLY_TITLE: '/data/applyTitle.json',
  LOCAL_GET_APPLY: '/data/applyData.json',
};

export const mainApiURL = {};

export const loginApiURL = {};

export const signupApiURL = {};

export const listApiURL = {
  MOK_GET_LIST: '/data/food-gold.json',
  GET_LIST: query => `/list?${query}`,
};

export const myApiURL = {
  MOK_GET_USER_INFO: '/data/user.json',
  GET_USER_INFO: id => `/userinfo/${id}`,
  GET_USER_INFO_UPDATE: id => `/userinfo/${id}`,
  POST_CREATE_REVIEW: pathVariable => `/reviwe/${pathVariable}`,
  GET_ORDERS: '/data/orders.json',
  GET_COUPONS: '/data/coupons.json',
  GET_REVIEWS: '/data/reviews.json',
};
