export const FETCH_USER_NAME = 'FETCH_USER_NAME';
export const FETCH_USER_ASSERTIONS = 'FETCH_USER_ASSERTIONS';
export const FETCH_USER_SCORE = 'FETCH_USER_SCORE';
export const FETCH_USER_EMAIL = 'FETCH_USER_EMAIL';

export function fetchUserName(name) {
  return {
    type: FETCH_USER_NAME,
    payload: {
      name,
    },
  };
}

export function fetchUserAssertions(assertions) {
  return {
    type: FETCH_USER_ASSERTIONS,
    payload: {
      assertions,
    },
  };
}

export function fetchUserScore(score) {
  return {
    type: FETCH_USER_SCORE,
    payload: {
      score,
    },
  };
}

export function fetchUserEmail(email) {
  return {
    type: FETCH_USER_EMAIL,
    payload: {
      gravatarEmail: email,
    },
  };
}
