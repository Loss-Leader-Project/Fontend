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
  GET_LIST: query => `/store/list/?${query}`,
};

/**
 * GET_USER_INFO 유저정보 가져오기
 * GET_USER_INFO_UPDATE 유저정보 수정
 * POST_CREATE_REVIEW 업체 리뷰 작성
 * GET_ORDERS 구매 정보
 * GET_COUPONS 쿠폰 정보
 * GET_REVIEWS 작성한 업체 리뷰
 */
export const myApiURL = {
  GET_USER_INFO: `/user/info`,
  GET_USER_INFO_UPDATE: `/user/info`,
  POST_CREATE_REVIEW: pathVariable => `/reviwe/${pathVariable}`,
  GET_ORDERS: '/data/orders.json',
  GET_COUPONS: '/data/coupons.json',
  GET_REVIEWS: '/data/reviews.json',
};
