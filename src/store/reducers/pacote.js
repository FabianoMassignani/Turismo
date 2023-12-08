import {
    GET_PACOTES,
    GET_PACOTES_REQUEST,
} from "../constants/pacote";

export const pacoteReducer = (
    state = { pacotes: [], loadingP: false },
    action
) => {
    switch (action.type) {
        case GET_PACOTES_REQUEST:
            return { ...state, loadingP: true, };
        case GET_PACOTES:
            return {
                ...state,
                loadingP: false,
                pacotes: action.payload.pacotes,
            };
        default:
            return { ...state }
    }
};
