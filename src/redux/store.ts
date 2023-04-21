import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { all, fork } from 'redux-saga/effects';
import createSagaMiddleware from 'redux-saga';
import { createWrapper } from 'next-redux-wrapper';
import authSaga from './auth/authSaga';
import authSlice from './auth/authSlice';
import toastSlice from './toast/toastSlice';

const sagaMiddleware = createSagaMiddleware();

function* rootSaga() {
  yield all([fork(authSaga)]);
}

const combinedReducers = combineReducers({
  auth: authSlice,
  toast: toastSlice,
});

const store = configureStore({
  reducer: combinedReducers,
  middleware: (gDM) => gDM({ serializableCheck: false }).concat(sagaMiddleware),
});

const makeStore = () => store;

export type AppStore = ReturnType<typeof makeStore>;

export const wrapper = createWrapper<AppStore>(makeStore);

// @ts-ignore
store.sagaTask = sagaMiddleware.run(rootSaga);
