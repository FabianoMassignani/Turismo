import {
    GET_PASSEIOS,
    GET_PASSEIOS_REQUEST,

} from "../constants/passeio";

export const passeioReducer = (
    state = { passeios: [], loading: false },
    action
) => {
    switch (action.type) {
        case GET_PASSEIOS_REQUEST:
            return { ...state, loading: true, };
        case GET_PASSEIOS:
            return {
                ...state,
                loading: false,
                passeios: action.payload.passeios,
            };
        default:
            return state;
    }
};
