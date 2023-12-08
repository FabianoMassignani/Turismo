import {
    GET_PASSEIOS,
    GET_PASSEIOS_REQUEST,
    GET_COMENTARIOS_REQUEST,
    GET_COMENTARIOS,

} from "../constants/passeio";

export const passeioReducer = (
    state = { passeios: [], loadingPas: false },
    action
) => {
    switch (action.type) {
        case GET_PASSEIOS_REQUEST:
            return { ...state, loadingPas: true, };
        case GET_PASSEIOS:
            return {
                ...state,
                loadingPas: false,
                passeios: action.payload.passeios,
            };
        case GET_COMENTARIOS_REQUEST:
            return { ...state, loadingPas: true, };
        case GET_COMENTARIOS:
            return {
                ...state,
                loadingPas: false,
                comentarios: action.payload.comentarios,
            };
        default:
            return { ...state }
    }
};
