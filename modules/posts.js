import { createAction, handleActions } from 'redux-actions';
import { takeLatest, all } from 'redux-saga/effects';

import * as api from 'lib/api';
import createRequestSaga from 'lib/createRequestSaga';

const GET_POSTS = 'posts/GET_POSTS';
const GET_POSTS_SUCCESS = 'posts/GET_POSTS_SUCCESS';
const GET_COMMENTS = 'posts/GET_COMMENTS';
const GET_COMMENTS_SUCCESS = 'posts/GET_COMMENTS_SUCCESS';

export const getPosts = createAction(GET_POSTS);
export const getComments = createAction(GET_COMMENTS, id => id);

const getPostsSaga = createRequestSaga(GET_POSTS, api.getPosts);
const getCommentsSaga = createRequestSaga(GET_COMMENTS, api.getCommentsById);

export function* postsSaga() {
    yield all([takeLatest(GET_POSTS, getPostsSaga), takeLatest(GET_COMMENTS, getCommentsSaga)]);
}

const initialState = {
    posts: null,
    comments: null
};

const posts = handleActions(
    {
        [GET_POSTS_SUCCESS]: (state, action) => ({
            ...state,
            posts: action.payload
        }),
        [GET_COMMENTS_SUCCESS]: (state, action) => ({
            ...state,
            comments: action.payload
        })
    },
    initialState
);

export default posts;
