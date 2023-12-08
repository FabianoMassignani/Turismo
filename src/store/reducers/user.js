import {
  GET_LOGIN,
  GET_LOGIN_REQUEST,
  POST_REGISTER,
  POST_REGISTER_REQUEST,
  GET_USER_REQUEST,
  GET_USER,
  GET_USERS_REQUEST,
  GET_USERS,
  GET_LOGIN_FAIL,
  GET_USER_FAIL
} from "../constants/user";

export const userReducer = (
  state = { user: {}, users: [], token: undefined, loadingU: false },
  action
) => {
  switch (action.type) {
    case GET_LOGIN_REQUEST:
      return { ...state, loadingU: true };
    case GET_LOGIN:
      return {
        ...state,
        loadingU: false,
        token: action.payload.token,
      };
    case GET_LOGIN_FAIL:
      return {
        ...state,
        loadingU: false,
        message: action.payload.message,
      };
    case GET_USER_REQUEST:
      return { ...state, loadingU: true }
    case GET_USER:
      return {
        ...state,
        loadingU: false,
        user: action.payload.user,
      }
    case GET_USER_FAIL:
      return {
        ...state,
        loadingU: false,
        message: action.payload.message,
      }
    case GET_USERS_REQUEST:
      return { ...state, loadingU: true }
    case GET_USERS:
      return {
        ...state,
        loadingU: false,
        users: action.payload.users,
      }
    case POST_REGISTER_REQUEST:
      return { ...state, loadingU: true }
    case POST_REGISTER:
      return {
        ...state,
        loadingU: false,
      }
    case "LOGOUT":
      return {
        ...state,
        token: undefined,
        user: {},
      };
    default:

      return { ...state }
  }
};
