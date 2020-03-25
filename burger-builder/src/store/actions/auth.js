import * as actionTypes from './actionTypes';
import axios from 'axios';

const signUpBaseUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';
const signInBaseUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';
let myCurrentLoginTimeout = null;
const tokenKey = 'token';
const expKey = 'expirationDate';
const userIdKey = 'userId';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        tokenId: token,
        userId: userId
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    localStorage.removeItem(tokenKey);
    localStorage.removeItem(expKey);
    localStorage.removeItem(userIdKey);
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (secondsToExpiration) => {
    return dispatch => {
        if (myCurrentLoginTimeout)
            clearTimeout(myCurrentLoginTimeout);

        const timeoutInMilliseconds = secondsToExpiration * 1000;

        myCurrentLoginTimeout = setTimeout(() => {
            dispatch(logout());
            myCurrentLoginTimeout = null;
        }, timeoutInMilliseconds);
    };
};

export const authSubmit = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        axios.post(`${isSignUp ? signUpBaseUrl : signInBaseUrl}key`, authData)
            .then(response => {
                const {idToken, localId, expiresIn} = response.data;
                // token
                localStorage.setItem(tokenKey, idToken);
                // date
                const expirationDate = new Date(
                    (new Date().getTime()) // convert to milliseconds
                    + (expiresIn * 1000) // convert to milliseconds
                );
                localStorage.setItem(expKey, expirationDate.toString());
                // userId
                localStorage.setItem(userIdKey, localId);
                // dispatch
                dispatch(authSuccess(idToken, localId));
                dispatch(checkAuthTimeout(expiresIn));
            })
            .catch(error => dispatch(authFail(error.response.data.error)));
    };
};

export const authInitState = () => {
    return dispatch => {
        const token = localStorage.getItem(tokenKey);
        const expDate = localStorage.getItem(expKey);
        const userId = localStorage.getItem(userIdKey);

        if (token && userId && expDate && (new Date(expDate) > new Date())) {
            dispatch(authSuccess(token, userId));
            const differenceInMilliseconds = new Date(localStorage.getItem(expKey)) - new Date().getTime();
            dispatch(checkAuthTimeout(differenceInMilliseconds / 1000));
        } else {
            dispatch(logout());
        }
    };
};
