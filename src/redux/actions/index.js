import { fetchToken } from '../../services/fetch';

export const FETCH_USER_NAME = 'FETCH_USER_NAME';
export const FETCH_USER_ASSERTIONS = 'FETCH_USER_ASSERTIONS';
export const FETCH_USER_SCORE = 'FETCH_USER_SCORE';
export const FETCH_USER_EMAIL = 'FETCH_USER_EMAIL';
export const SAVE_TOKEN = 'SAVE_TOKEN';

export function fetchUserAssertions(assertions) {
  return {
    type: FETCH_USER_ASSERTIONS,
    payload: {
      assertions,
    },
  };
} //31758d23255298741cda714e07dba610e704726c4b953c7322c3da6a9f9b36d3

export function fetchUserScore(score) {
  return {
    type: FETCH_USER_SCORE,
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
  type: FETCH_USER_NAME,
  payload,
});

export const saveEmail = (payload) => ({
  type: FETCH_USER_EMAIL,
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
