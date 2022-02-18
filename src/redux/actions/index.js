import { fetchToken } from '../../services/fetch';

export const SAVE_USER_NAME = 'SAVE_USER_NAME';
export const SAVE_USER_ASSERTIONS = 'SAVE_USER_ASSERTIONS';
export const SAVE_USER_SCORE = 'SAVE_USER_SCORE';
export const SAVE_USER_EMAIL = 'SAVE_USER_EMAIL';
export const SAVE_TOKEN = 'SAVE_TOKEN';

export function saveUserAssertions(assertions) {
  return {
    type: SAVE_USER_ASSERTIONS,
    payload: {
      assertions,
    },
  };
}
export function saveUserScore(score) {
  return {
    type: SAVE_USER_SCORE,
    payload: {
      score,
    },
  };
}

export const saveToken = (payload) => ({
  type: SAVE_TOKEN,
  payload,
});

export const saveName = (payload) => ({
  type: SAVE_USER_NAME,
  payload,
});

export const saveEmail = (payload) => ({
  type: SAVE_USER_EMAIL,
  payload,
});

export const fetchTokenThunk = () => async (dispatch) => {
  try {
    const token = await fetchToken();
    dispatch(saveToken(token));
  } catch (error) {
    console.error(error.mesage);
  }
};
