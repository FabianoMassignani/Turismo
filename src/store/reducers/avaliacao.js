import {
    GET_AVALIACAO,
    GET_AVALIACAO_REQUEST,
} from "../constants/avaliacao";

export const avaliacaoReducer = (
    state = { avaliacoes: [], loading: false },
    action
) => {
    switch (action.type) {
        case GET_AVALIACAO_REQUEST:
            return { ...state, loading: true, };
        case GET_AVALIACAO:
            return {
                ...state,
                loading: false,
                avaliacoes: action.payload.avaliacao,
            };
        default:
            return { ...state }
    }
};
