const LOGIN_CHECK = 'loginCheck';

let loginState = '';

function loginStateReducer(state = loginState, actions) {
  if (actions.type === LOGIN_CHECK) {
    state = actions.payload;
    return state;
  }
  return state;
}

export const loginCheckAction = payload => ({
  payload: payload,
  type: LOGIN_CHECK,
});

export default loginStateReducer;
