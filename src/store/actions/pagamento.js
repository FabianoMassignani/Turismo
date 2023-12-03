import axios from "axios";

import {
    GET_PAGAMENTO_REQUEST,
    GET_PAGAMENTO,
    POST_PAGAMENTO_REQUEST,
    POST_PAGAMENTO,
} from "../constants/pagamento";

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
                    pagamentos: response.data,
                },
            });
        })
        .catch(error => {
            console.log(error);
        });
}

export const postPagamento = (data, token) => async (dispatch) => {
    dispatch({ type: POST_PAGAMENTO_REQUEST });

    data = {
        ...data
    };

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };

    await axios
        .post(`${API_URL}/pagamento`, data, config)
        .then(function (res) {
            dispatch({
                type: POST_PAGAMENTO,
                payload: {
                    pagamento: res.data,
                },
            });
        })
        .catch((err) => console.log(err));
}