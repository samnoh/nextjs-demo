import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';

import posts, { postsSaga } from './posts';
import loading from './loading';

const rootReducer = combineReducers({
    posts,
    loading
});

export function* rootSaga() {
    yield all([postsSaga()]);
}

export default rootReducer;
