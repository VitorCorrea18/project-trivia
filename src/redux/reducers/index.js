import { combineReducers } from 'redux';
import playerReducer from './playerReducer';
import tokenReducer from './tokenReducer';

const rootReducer = combineReducers({ playerReducer, tokenReducer });

export default rootReducer;
