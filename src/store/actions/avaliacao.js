import axios from "axios";

import {
    GET_AVALIACAO_REQUEST,
    GET_AVALIACAO,
} from "../constants/pacote";

import { API_URL_NODE } from "../../globalVariables";

export const getAvaliacao = () => async (dispatch) => {
    dispatch({ type: GET_AVALIACAO_REQUEST });

    await axios.get(`${API_URL_NODE}/avaliacao`)
        .then(response => {
            dispatch({
                type: GET_AVALIACAO,
                payload: {
                    avaliacao: response.data,
                },
            });
        })
        .catch(error => {
            console.log(error);
        });
}



