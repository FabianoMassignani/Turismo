import {
    GET_PAGAMENTO,
    GET_PAGAMENTO_REQUEST,
} from "../constants/pagamento";

export const pagamentoReducer = (
    state = { pagamento: [], loadingPag: false },
    action
) => {
    switch (action.type) {
        case GET_PAGAMENTO_REQUEST:
            return { ...state, loadingPag: true, };
        case GET_PAGAMENTO:
            return {
                ...state,
                loadingPag: false,
                pagamento: action.payload.pagamento,
            };
        default:
            return { ...state }
    }
};
