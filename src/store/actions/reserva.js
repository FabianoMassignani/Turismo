import axios from "axios";

import {
    GET_RESERVA_REQUEST,
    GET_RESERVA,
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



