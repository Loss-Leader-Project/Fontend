import { combineReducers, createStore } from 'redux';
import loginReducer from './reducers/loginReducer.js';

let store = createStore(combineReducers({ loginReducer }));

export default store;
