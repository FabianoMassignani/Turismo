import {
    GET_AVALIACAO,
    GET_AVALIACAO_REQUEST,
} from "../constants/avaliacao";

export const avaliacaoReducer = (
    state = { avaliacoes: [], loadingA: false },
    action
) => {
    switch (action.type) {
        case GET_AVALIACAO_REQUEST:
            return { ...state, loadingA: true, };
        case GET_AVALIACAO:
            return {
                ...state,
                loadingA: false,
                avaliacoes: action.payload.avaliacao,
            };
        default:
            return { ...state }
    }
};
