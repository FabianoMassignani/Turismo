import axios from "axios";

import {
    GET_RESERVA_REQUEST,
    GET_RESERVA,
    POST_RESERVA_REQUEST,
    POST_RESERVA,
    DELETE_RESERVA_REQUEST,
    DELETE_RESERVA,
    PUT_RESERVA_REQUEST,
    PUT_RESERVA,
} from "../constants/reserva";

import { API_URL } from "../../globalVariables";


export const getReserva = (token) => async (dispatch) => {
    dispatch({ type: GET_RESERVA_REQUEST });

    await axios.get(`${API_URL}/reserva`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => {
            dispatch({
                type: GET_RESERVA,
                payload: {
                    reservas: response.data,
                },
            });
        })
        .catch(error => {
            console.log(error);
        });
}

export const postReserva = (data, token, callback) => async (dispatch) => {
    dispatch({ type: POST_RESERVA_REQUEST });

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };

    await axios
        .post(`${API_URL}/reserva`, data, config)
        .then(function (res) {
            dispatch({
                type: POST_RESERVA,
                payload: {
                    reserva: res.data,
                },
            });

            callback();
        })
        .catch((err) => console.log(err));
}



export const deleteReserva = (data, token, callback) => async (dispatch) => {
    dispatch({ type: DELETE_RESERVA_REQUEST });

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };

    await axios
        .delete(`${API_URL}/reserva/${data.key}`, config)
        .then(function (res) {
            dispatch({
                type: DELETE_RESERVA,
            });

            callback();
        })
        .catch((err) => console.log(err));
}

export const updateReserva = (data, token, callback) => async (dispatch) => {
    dispatch({ type: PUT_RESERVA_REQUEST });

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };

    data = {
        ...data,
        data: new Date(data.data),
        id: data.key,
    }

    await axios
        .put(`${API_URL}/reserva/${data.id}`, data, config)
        .then(function (res) {
            dispatch({
                type: PUT_RESERVA,
            });

            callback();
        })
        .catch((err) => console.log(err));
}








