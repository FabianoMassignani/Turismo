import {
    GET_PACOTES,
    GET_PACOTES_REQUEST,
} from "../constants/pacote";

export const pacoteReducer = (
    state = { pacotes: [], loading: false },
    action
) => {
    switch (action.type) {
        case GET_PACOTES_REQUEST:
            return { ...state, loading: true, };
        case GET_PACOTES:
            return {
                ...state,
                loading: false,
                pacotes: action.payload.pacotes,
            };
        default:
            return state;
    }
};
