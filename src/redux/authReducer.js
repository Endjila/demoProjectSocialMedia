import { stopSubmit } from "redux-form";
import { authApi, securityApi } from "./../api/api"

const SET_USER_DATA = 'myProject/auth/SET_USER_DATA';
const TOGGLE_IS_FETCHING = 'myProject/auth/TOGGLE_IS_FETCHING';
const GET_CAPTCHA_URL = 'myProject/auth/GET_CAPTCHA_URL';

let initialState = {
    userId: null,
    email: null,
    login: null,
    isFetching: false,
    isAuth: false,
    captchaUrl: null,
};

const authsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return { ...state, ...action.payload, }
        case GET_CAPTCHA_URL:
            return { ...state, ...action.payload, }
        default:
            return state;
    }
}

export const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching });
export const setAuthUserData = (userId, email, login, isAuth) => ({
    type: SET_USER_DATA, payload: { userId, email, login, isAuth }
});
export const getCaptchaUrlSuccess = (captchaUrl) => ({ type: GET_CAPTCHA_URL, payload: {captchaUrl} });

export const authThunkCreator = () => {
    return async dispatch => {
        dispatch(toggleIsFetching(true));
        let data = await authApi.me();
        if (data.resultCode === 0) {
            let { id, email, login } = data.data;
            dispatch(setAuthUserData(id, email, login, true));
        }
        dispatch(toggleIsFetching(false));
    }
}

export const loginTC = (email, password, rememberMe, captcha) => async (dispatch) => {
    dispatch(toggleIsFetching(true));
    let response = await authApi.login(email, password, rememberMe, captcha);
    if (response.data.resultCode === 0) {
        dispatch(authThunkCreator());
    } else {
        if (response.data.resultCode === 10) {
            dispatch(getCaptchaUrl());
        }
        let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error";
        dispatch(stopSubmit('login', { _error: message, }));
    }
    dispatch(toggleIsFetching(false));
}

export const logoutTC = () => async (dispatch) => {
    dispatch(toggleIsFetching(true));
    let response = await authApi.logout();
    if (response.data.resultCode === 0) {
        let { userId, email, login } = response.data.data;
        dispatch(setAuthUserData(null, null, null, false));
    }
    dispatch(toggleIsFetching(false));
}

export const getCaptchaUrl = () => async (dispatch) => {
    let response = await securityApi.getCaptcha();
    const captchaUrl = response.data.url;
    dispatch(getCaptchaUrlSuccess(captchaUrl));
}

export default authsReducer;