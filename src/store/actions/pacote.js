import axios from "axios";

import {
    GET_PACOTES_REQUEST,
    GET_PACOTES,
} from "../constants/pacote";

import { API_URL } from "../../globalVariables";

export const getPacotes = (token) => async (dispatch) => {
    dispatch({ type: GET_PACOTES_REQUEST });

    await axios.get(`${API_URL}/pacote`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => {
            dispatch({
                type: GET_PACOTES,
                payload: {
                    pacotes: response.data,
                },
            });
        })
        .catch(error => {
            console.log(error);
        });
}



