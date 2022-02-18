import {
  SAVE_USER_NAME,
  SAVE_USER_ASSERTIONS,
  SAVE_USER_SCORE,
  SAVE_USER_EMAIL,
} from '../actions/index';

const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: '',
  gravatarEmail: '',
};

function player(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
  case SAVE_USER_NAME:
    return { ...state, name: payload };
  case SAVE_USER_ASSERTIONS:
    return { ...state, assertions: payload };
  case SAVE_USER_SCORE:
    return { ...state, score: payload };
  case SAVE_USER_EMAIL:
    return { ...state, email: payload };
  default:
    return state;
  }
}

export default player;
