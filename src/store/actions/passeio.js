import axios from "axios";

import {
    GET_PASSEIOS_REQUEST,
    GET_PASSEIOS,
    POST_PASSEIO_REQUEST,
    POST_PASSEIO,
    DELETE_PASSEIO_REQUEST,
    DELETE_PASSEIO,
    UPDATE_PASSEIO_REQUEST,
    UPDATE_PASSEIO,
    POST_COMENTARIO_REQUEST,
    POST_COMENTARIO,
    GET_COMENTARIOS_REQUEST,
    GET_COMENTARIOS,
} from "../constants/passeio";

import { API_URL, API_URL_NODE } from "../../globalVariables";

export const getPasseios = () => async (dispatch) => {
    dispatch({ type: GET_PASSEIOS_REQUEST });

    await axios.get(`${API_URL}/passeio`, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(response => {
            dispatch({
                type: GET_PASSEIOS,
                payload: {
                    passeios: response.data,
                },
            });
        })
        .catch(error => {
            console.log(error);
        });
}


export const postPasseio = (data, token, callback) => async (dispatch) => {
    dispatch({ type: POST_PASSEIO_REQUEST });

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };

    await axios
        .post(`${API_URL}/passeio`, data, config)
        .then(function (res) {
            dispatch({
                type: POST_PASSEIO,
                payload: {
                    passeio: res.data,
                },
            });

            callback();
        })
        .catch((err) => console.log(err));
}

export const deletePasseio = (data, token, callback) => async (dispatch) => {
    dispatch({ type: DELETE_PASSEIO_REQUEST });

    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };

    try {
        const res = await axios.delete(`${API_URL}/passeio/${data.key}`, config);
        dispatch({
            type: DELETE_PASSEIO,
        });

        callback();
    } catch (error) {
        console.error("Error deleting passeio:", error);
        // Dispatch an error action or handle the error as needed
    }
};


export const updatePasseio = (data, token, callback) => async (dispatch) => {
    dispatch({ type: UPDATE_PASSEIO_REQUEST });

    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };

    await axios
        .put(`${API_URL}/passeio/${data.key}`, data, config)
        .then(function (res) {
            dispatch({
                type: UPDATE_PASSEIO,
                payload: {
                    passeio: res.data,
                },
            });

            callback();
        })
        .catch((err) => console.log(err));
}

// let avaliacao = new Avaliacao({
//     idPasseio: req.body.idPasseio,
//     idUsuario: req.body.idUsuario,
//     dataAvaliacao: req.body.dataAvaliacao,
//     classificacao: req.body.classificacao,
//     comentario: req.body.comentario,
//   });

export const postComentario = (data, callback) => async (dispatch) => {
    dispatch({ type: POST_COMENTARIO_REQUEST });

    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    };

    await axios
        .post(`${API_URL_NODE}/avaliacao`, data, config)
        .then(function (res) {
            dispatch({
                type: POST_COMENTARIO,
                payload: {
                    comentario: res.data,
                },
            });

            callback();
        })
        .catch((err) => console.log(err));

}

export const getComentarios = (data) => async (dispatch) => {
    dispatch({ type: GET_COMENTARIOS_REQUEST });

    await axios.get(`${API_URL_NODE}/avaliacao`,
        {
            headers: {
                'Content-Type': 'application/json',
            },
            params: {
                idPasseio: data.idPasseio,
            }
        })
        .then(response => {
            dispatch({
                type: GET_COMENTARIOS,
                payload: {
                    comentarios: response.data,
                },
            });
        })
        .catch(error => {
            console.log(error);
        });
}