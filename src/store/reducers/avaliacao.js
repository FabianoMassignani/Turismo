import {
    GET_AVALIACAO,
    GET_AVALIACAO_REQUEST,
} from "../constants/avaliacao";

export const avaliacaoReducer = (
    state = { AVALIACAO: [], loading: false },
    action
) => {
    switch (action.type) {
        case GET_AVALIACAO_REQUEST:
            return { ...state, loading: true, };
        case GET_AVALIACAO:
            return {
                ...state,
                loading: false,
                avaliacao: action.payload.avaliacao,
            };
        default:
            return state;
    }
};
