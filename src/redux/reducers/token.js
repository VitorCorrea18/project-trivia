import { SAVE_TOKEN } from '../actions/index';

const INITIAL_STATE = '';

function token(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
  case SAVE_TOKEN:
    return payload;
  default:
    return state;
  }
}

export default token;
