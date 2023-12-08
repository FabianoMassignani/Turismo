import {
    GET_RESERVA,
    GET_RESERVA_REQUEST,
    DELETE_RESERVA_REQUEST,
    DELETE_RESERVA,
} from "../constants/reserva";

export const reservaReducer = (
    state = { reservas: [], loadingR: false },
    action
) => {
    switch (action.type) {
        case GET_RESERVA_REQUEST:
            return { ...state, loadingR: true, };
        case GET_RESERVA:
            return {
                ...state,
                loadingR: false,
                reservas: action.payload.reservas,
            };
        case DELETE_RESERVA_REQUEST:
            return { ...state, loadingR: true }
        case DELETE_RESERVA:
            return {
                ...state,
                loadingR: false,
            }
        default:
            return { ...state }
    }
};
