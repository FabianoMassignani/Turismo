import axios from "axios";

import {
  GET_LOGIN_REQUEST,
  GET_LOGIN,
  POST_REGISTER,
  POST_REGISTER_REQUEST,
  GET_USER_REQUEST,
  GET_USER
} from "../constants/user";

import { API_URL } from "../../globalVariables";
import { setNavigate } from "../../store/actions/ui";

export const onLogar = (data) => async (dispatch) => {
  dispatch({ type: GET_LOGIN_REQUEST });

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  await axios
    .post(`${API_URL}/auth`, data, config)
    .then(function (res) {
      dispatch({
        type: GET_LOGIN,
        payload: {
          token: res.data.token,
        },
      });

      if (res.data.token)
        dispatch(getUser(res.data.token, data.username));
    })
    .catch((err) => console.log(err));
}

export const getUser = (token, username) => async (dispatch) => {
  dispatch({ type: GET_USER_REQUEST });

  await axios.get(`${API_URL}/pessoa/email/${username}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then(response => {
      dispatch({
        type: GET_USER,
        payload: {
          user: response.data,
        },
      });
      dispatch(setNavigate("/"));
    })
    .catch(error => {
      console.log(error);
    });
}

export const onRegistrar = (data) => async (dispatch) => {
  dispatch({ type: POST_REGISTER_REQUEST });

  data = {
    email: data.email,
    senha: data.password,
    nome: data.nome,
    telefone: data.telefone,
    dataAniversario: data.dataAniversario,
    identificacao: data.identificacao,
  };

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  await axios
    .post(`${API_URL}/pessoa`, data, config)
    .then(function (res) {
      dispatch({
        type: POST_REGISTER,
        payload: {
          user: res.data,
        },
      });
    })
    .catch((err) => console.log(err));
}

