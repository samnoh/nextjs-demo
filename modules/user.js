import { createAction, handleActions } from 'redux-actions';
import { takeLatest, all } from 'redux-saga/effects';

import * as api from 'lib/api';
import createRequestSaga from 'lib/createRequestSaga';

const POST_USER = 'user/POST_USER';
const POST_USER_SUCCESS = 'user/POST_USER_SUCCESS';
const POST_LOGOUT = 'user/POST_LOGOUT';
const POST_LOGOUT_SUCCESS = 'user/POST_LOGOUT_SUCCESS';
const CHECK_LOGIN = 'user/CHECK_LOGIN';
const CHECK_LOGIN_SUCCESS = 'user/CHECK_LOGIN_SUCCESS';

export const postUser = createAction(POST_USER, formData => formData);
export const postLogout = createAction(POST_LOGOUT);
export const checkLogin = createAction(CHECK_LOGIN);

const postUserSaga = createRequestSaga(POST_USER, api.postUser);
const postLogoutSaga = createRequestSaga(POST_LOGOUT, api.postLogout);
const checkLoginSaga = createRequestSaga(CHECK_LOGIN, api.checkLogin);

export function* userSaga() {
    yield all([
        takeLatest(POST_USER, postUserSaga),
        takeLatest(POST_LOGOUT, postLogoutSaga),
        takeLatest(CHECK_LOGIN, checkLoginSaga)
    ]);
}

const initialState = {
    user: null
};

const user = handleActions(
    {
        [POST_USER_SUCCESS]: (state, action) => ({
            ...state,
            user: action.payload
        }),
        [POST_LOGOUT_SUCCESS]: (state, action) => ({
            ...state,
            user: null
        }),
        [CHECK_LOGIN_SUCCESS]: (state, action) => ({
            ...state,
            user: action.payload
        })
    },
    initialState
);

export default user;
