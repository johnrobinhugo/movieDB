import { combineReducers } from "@reduxjs/toolkit";
import { ADD_LIKE, REMOVE_LIKE, SET_USER } from "./actions";

function likesReducer(state = [], action) {
  switch (action.type) {
    case ADD_LIKE:
      return [...state, action.payload];
    case REMOVE_LIKE:
      return state.filter((item) => item.id !== action.payload.id);
    default:
      return state;
  }
}

function userReducer(state = {}, action) {
  switch (action.type) {
    case SET_USER:
      return action.payload;
    default:
      return state;
  }
}

const allReducers = combineReducers({
  likes: likesReducer,
  user: userReducer,
});

export default allReducers;
