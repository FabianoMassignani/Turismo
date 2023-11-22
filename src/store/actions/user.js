import axios from "axios";

import {
  GET_LOGIN_REQUEST,
  GET_LOGIN,
  POST_REGISTER,
  POST_REGISTER_REQUEST
} from "../constants/user";

import { API_URL } from "../../globalVariables";

export const onLogar = (data) => async (dispatch) => {
  dispatch({ type: GET_LOGIN_REQUEST });

  let res = await axios.get(
    `${API_URL}`
  );

  dispatch({
    type: GET_LOGIN,
    payload: {
      user: res.data,
    },
  });
}

export const onRegistrar = (data) => async (dispatch) => {
  dispatch({ type: POST_REGISTER_REQUEST });

  let res = await axios.get(
    `${API_URL}`
  );

  dispatch({
    type: POST_REGISTER,
    payload: {
      user: res.data,
    },
  });
}

