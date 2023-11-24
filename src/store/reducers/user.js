import {
  GET_LOGIN,
  GET_LOGIN_REQUEST,
  POST_REGISTER,
  POST_REGISTER_REQUEST,
  GET_USER_REQUEST,
  GET_USER
} from "../constants/user";

export const userReducer = (
  state = { user: {}, token: undefined, loading: false },
  action
) => {
  switch (action.type) {
    case GET_LOGIN_REQUEST:
      return { ...state, loading: true, };
    case GET_LOGIN:
      return {
        ...state,
        loading: false,
        token: action.payload.token,
      };
    case GET_USER_REQUEST:
      return { ...state, loading: true }
    case GET_USER:
      return {
        ...state,
        loading: false,
        user: action.payload.user,
      }
    case POST_REGISTER_REQUEST:
      return { ...state, loading: true }
    case POST_REGISTER:
      return {
        ...state,
        loading: false,
      }
    case "LOGOUT":
      return {
        ...state,
        token: undefined,
        user: {},
      };
    default:
      return state;
  }
};
