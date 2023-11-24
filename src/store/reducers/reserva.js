import {
    GET_RESERVA,
    GET_RESERVA_REQUEST,
} from "../constants/reserva";

export const  reservaReducer = (
    state = { reservas: [], loading: false },
    action
) => {
    switch (action.type) {
        case GET_RESERVA_REQUEST:
            return { ...state, loading: true, };
        case GET_RESERVA:
            return {
                ...state,
                loading: false,
                reservas: action.payload.reservas,
            };
        default:
            return state;
    }
};
