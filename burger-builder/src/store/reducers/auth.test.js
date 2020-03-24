import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer', () => {
    const reducerInitState = {
        token: null,
        userId: null,
        error: null,
        loading: false
    };

    it('should return initial state', () => {
        expect(reducer(undefined, {})).toEqual(reducerInitState);
    });

    const token = 'asdasdasd';
    const userId = 'asdasdasdasd';
    const authSuccessAction = {
        type: actionTypes.AUTH_SUCCESS,
        tokenId: token,
        userId: userId
    };
    const reducerAuthSuccessState = {
        token: token,
        userId: userId,
        error: null,
        loading: false
    };

    it('should store the token upon login', () => {
        expect(reducer(reducerInitState, authSuccessAction)).toEqual(reducerAuthSuccessState);
    });
});
