import * as actionTypes from '../actions/actionTypes';

const initState = {
    token: null,
    userId: null,
    error: null,
    loading: false
};

const reducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return {
                ...state,
                error: null,
                loading: true
            };
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                error: null,
                token: action.tokenId,
                userId: action.userId,
                loading: false
            };
        case actionTypes.AUTH_FAIL:
            return {
                ...state,
                error: action.error,
                loading: false
            };
        case actionTypes.AUTH_LOGOUT:
            return {
                ...state,
                token: null,
                userId: null
            };
        default:
            return state;
    }
};

export default reducer;
