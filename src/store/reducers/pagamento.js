import {
    GET_PAGAMENTO,
    GET_PAGAMENTO_REQUEST,
} from "../constants/pagamento";

export const pagamentoReducer = (
    state = { pagamento: [], loading: false },
    action
) => {
    switch (action.type) {
        case GET_PAGAMENTO_REQUEST:
            return { ...state, loading: true, };
        case GET_PAGAMENTO:
            return {
                ...state,
                loading: false,
                pagamento: action.payload.pagamento,
            };
        default:
            return { ...state }
    }
};
