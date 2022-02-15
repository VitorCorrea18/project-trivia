import {
  FETCH_USER_NAME,
  FETCH_USER_ASSERTIONS,
  FETCH_USER_SCORE,
  FETCH_USER_EMAIL,
} from '../actions/index';

const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: '',
  gravatarEmail: '',
};

function playerReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
  case FETCH_USER_NAME:
    return { ...state, name: payload };
  case FETCH_USER_ASSERTIONS:
    return { ...state, assertions: payload };
  case FETCH_USER_SCORE:
    return { ...state, score: payload };
  case FETCH_USER_EMAIL:
    return { ...state, email: payload };
  default:
    return state;
  }
}

export default playerReducer;
