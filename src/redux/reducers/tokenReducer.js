import { FETCH_TOKEN } from '../actions/index';

const INITIAL_STATE = '';

function tokenReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
  case FETCH_TOKEN:
    return payload.token;
  default:
    return state;
  }
}

export default tokenReducer;
