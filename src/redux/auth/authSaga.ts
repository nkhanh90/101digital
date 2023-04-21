import { call, put, StrictEffect, takeLatest } from 'redux-saga/effects';
import authProvider, { ILoginApiResponse } from '@/service/authProvider';
import { handleStorage, userKey } from '@/utils/localStorage';
import { getMeFail, getMeSuccess, loginFail, loginSuccess } from './authSlice';
import { COOKIE_KEY, setTokensCookies } from '@/utils/cookiesUtils';
import { IReduxBaseAction } from '@/interface/IRedux';

export function* userLoginSaga(action: IReduxBaseAction): Generator<StrictEffect, void, any> {
  const { payload } = action;
  try {
    const response: ILoginApiResponse = yield call(authProvider.login, payload);
    const meData = yield call(authProvider.loadMe, response.access_token);
    yield call(setTokensCookies, COOKIE_KEY.accessToken, response.access_token, '/');
    yield call(setTokensCookies, COOKIE_KEY.orgToken, meData.memberships[0].token, '/');
    yield call(handleStorage, userKey, meData);
    yield put(
      loginSuccess({
        user: meData,
      })
    );
  } catch (error: any) {
    yield put(loginFail(error?.message));
  }
}

export function* userGetMe(action: IReduxBaseAction): Generator<StrictEffect, void, any> {
  try {
    const meData = yield call(authProvider.getMe);
    yield put(getMeSuccess(meData));
  } catch (error: any) {
    yield put(getMeFail(error));
  }
}

function* authSaga() {
  yield takeLatest('auth/login', userLoginSaga);
  yield takeLatest('auth/getMe', userGetMe);
}

export default authSaga;
