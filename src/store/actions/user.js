import axios from "axios";

import {
  GET_LOGIN_REQUEST,
  GET_LOGIN,
} from "../constants/user";

import { API_URL } from "../../globalVariables";

export const getUser = (data) => async (dispatch) => {
  dispatch({ type: GET_LOGIN_REQUEST });

  let res = await axios.get(
    `${API_URL}`
  );


  dispatch({
    type: GET_LOGIN_REQUEST,
    payload: {
      user: res.data,

    },
  });
}


