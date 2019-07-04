import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import axios from 'axios';

import posts, { postsSaga } from './posts';
import user, { userSaga } from './user';
import loading from './loading';

// const backEndUrl = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5000';

axios.defaults.baseURL = 'http://localhost:5000';

const rootReducer = combineReducers({
    posts,
    user,
    loading
});

export function* rootSaga() {
    yield all([postsSaga(), userSaga()]);
}

export default rootReducer;
