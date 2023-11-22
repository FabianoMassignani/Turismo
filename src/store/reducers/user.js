import {
  GET_LOGIN,
  GET_LOGIN_REQUEST,
  POST_REGISTER,
  POST_REGISTER_REQUEST
} from "../constants/user";

export const userReducer = (
  state = { user: {} },
  action
) => {
  switch (action.type) {
    case GET_LOGIN_REQUEST:
      return { ...state, loading: true, };
    case GET_LOGIN:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    case POST_REGISTER_REQUEST:
      return { ...state, loading: true }
    case POST_REGISTER:
      return {
        ...state,
        loading: false,
        user: action.payload,
      }
    default:
      return state;
  }
};
