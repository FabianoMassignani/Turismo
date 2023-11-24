import axios from "axios";

import {
    GET_PAGAMENTO_REQUEST,
    GET_PAGAMENTO,
} from "../constants/pacote";

import { API_URL } from "../../globalVariables";

export const getPagamento = (token) => async (dispatch) => {
    dispatch({ type: GET_PAGAMENTO_REQUEST });

    await axios.get(`${API_URL}/pagamento`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => {
            dispatch({
                type: GET_PAGAMENTO,
                payload: {
                    pagamento: response.data,
                },
            });
        })
        .catch(error => {
            console.log(error);
        });
}