import axios from "axios";

import {
  GET_LOGIN_REQUEST,
  GET_LOGIN,
  POST_REGISTER,
  POST_REGISTER_REQUEST,
  POST_REGISTER_FAIL,
  GET_USER_REQUEST,
  GET_USER,
  GET_USER_FAIL,
  GET_USERS_REQUEST,
  GET_USERS,
  GET_USERS_FAIL,
  DELETE_USER_REQUEST,
  GET_LOGIN_FAIL,
} from "../constants/user";

import { API_URL } from "../../globalVariables";
import { setNavigate } from "../../store/actions/ui";


export const onLogar = (data, mostrarAlerta) => async (dispatch) => {
  dispatch({ type: GET_LOGIN_REQUEST });

  const config = {
    headers: {
      'Content-Type': 'application/json',

    },
    withCredentials: true, // Add this line
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
        dispatch(getUser(res.data.token, data.username, mostrarAlerta));


    })
    .catch((err) => {
      dispatch({
        type: GET_LOGIN_FAIL,
        payload: {
          token: null,
          message: "Usuário ou senha inválidos"
        },
      });

    }
    );
}

export const getUser = (token, username, mostrarAlerta) => async (dispatch) => {
  dispatch({ type: GET_USER_REQUEST });

  await axios.get(`${API_URL}/pessoa/email/${username}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then(response => {
      if (response.status === 200) {
        dispatch({
          type: GET_USER,
          payload: {
            user: response.data,
          },
        });

        dispatch(setNavigate("/"));
      }
    })
    .catch(error => {
      dispatch({
        type: GET_LOGIN_FAIL,
        payload: {
          token: null,
          message: "Usuário ou senha inválidos"
        },
      });

      mostrarAlerta("Usuário ou senha inválidos");
    });
}

export const getUsers = () => async (dispatch) => {
  dispatch({ type: GET_USERS_REQUEST });

  await axios.get(`${API_URL}/pessoa`, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      dispatch({
        type: GET_USERS,
        payload: {
          users: response.data,
        },
      });
    })
    .catch(error => {
      dispatch({
        type: GET_USERS_FAIL,
        payload: {
          users: null,
          message: "Não foi possível carregar os usuários"
        },
      });

    });
}

export const onRegistrar = (data, callback, mostrarAlerta) => async (dispatch) => {
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
      'Content-Type': 'application/json',

    },
    withCredentials: true, // Add this line
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

      callback();
    })
    .catch((err) =>
      dispatch({
        type: POST_REGISTER_FAIL,
        payload: {
          user: null,
          message: "Não foi possível cadastrar o usuário"
        },
      }),

      mostrarAlerta('Não foi possível cadastrar o usuário')
    );
}

export const deleteUser = (id, token) => async (dispatch) => {
  dispatch({ type: DELETE_USER_REQUEST });

  await axios.delete(`${API_URL}/pessoa/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then(response => {
      dispatch(getUsers());
    })
    .catch(error => {
      dispatch({
        type: DELETE_USER_REQUEST,
        payload: {
          message: "Não foi possível deletar o usuário"
        },
      });
    });
}