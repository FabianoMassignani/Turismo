import {
    SET_UI
} from "../constants/ui";

export const uiReducer = (
    state = { navigate: "/" },
    action
) => {
    switch (action.type) {
        case SET_UI:
            return { ...state, navigate: action.payload, };
        default:
            return state;
    }
};
