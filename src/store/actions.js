// Action types
export const ADD_LIKE = "ADD_LIKE";
export const REMOVE_LIKE = "REMOVE_LIKE";
export const SET_USER = "SET_USER";

// Action creators
export function addLike(payload) {
  console.log(payload);
  return {
    type: ADD_LIKE,
    payload,
  };
}

export function removeLike(payload) {
  return {
    type: REMOVE_LIKE,
    payload,
  };
}

export function setUser(payload) {
  return {
    type: SET_USER,
    payload,
  };
}
