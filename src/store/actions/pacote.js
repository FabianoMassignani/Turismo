import axios from "axios";

import {
    GET_PACOTES_REQUEST,
    GET_PACOTES,
    UPDATE_PACOTE_REQUEST,
    UPDATE_PACOTE,
    POST_PACOTE_REQUEST,
    POST_PACOTE,
    DELETE_PACOTE_REQUEST,
    DELETE_PACOTE,
} from "../constants/pacote";

import { API_URL } from "../../globalVariables";

export const getPacotes = () => async (dispatch) => {
    dispatch({ type: GET_PACOTES_REQUEST });

    await axios.get(`${API_URL}/pacote`, {
        headers: {
            'Content-Type': 'application/json',

        },
        withCredentials: true, // Add this line
    })
        .then(response => {
            dispatch({
                type: GET_PACOTES,
                payload: {
                    pacotes: response.data,
                },
            });
            console.log(response.data);
        })
        .catch(error => {
            console.log(error);
        });
}

export const postPacote = (data, token, callback) => async (dispatch) => {
    dispatch({ type: POST_PACOTE_REQUEST });

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };

    await axios
        .post(`${API_URL}/pacote`, data, config)
        .then(function (res) {
            dispatch({
                type: POST_PACOTE,
                payload: {
                    pacote: res.data,
                },
            });

            callback();
        })
        .catch((err) => console.log(err));
}


export const updatePacote = (data, token, callback) => async (dispatch) => {
    dispatch({ type: UPDATE_PACOTE_REQUEST });

    await axios.put(`${API_URL}/pacote/${data.key}`, data, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => {
            dispatch({
                type: UPDATE_PACOTE,

            });

            callback();
        })
        .catch(error => {
            console.log(error);
        });
}



export const deletePacote = (data, token, callback) => async (dispatch) => {
    dispatch({ type: DELETE_PACOTE_REQUEST });

    await axios.delete(`${API_URL}/pacote/${data.key}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => {
            dispatch({
                type: DELETE_PACOTE,
            });

            callback();
        })
        .catch(error => {
            console.log(error);
        });
}