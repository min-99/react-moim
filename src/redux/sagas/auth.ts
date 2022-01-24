import { call, put, takeLatest } from 'redux-saga/effects';
import {
  AuthAction,
  loginProcAction,
  loginRequestAction,
  loginSuccessAction,
  logoutRequestAction,
  logoutSuccessAction,
} from '@/redux/reducers/auth';
import { relayLogin, relayLogout } from '@/api';
import { API_DEFAULT_ERROR_RESPONSE } from '@/constants';
import { isServer } from '@/utils';
import { getDecodeToken } from '@/service/authService';

function* loginProcSaga(action: AuthAction) {
  try {
    const { data } = yield call(relayLogin, { ...action.payload });
    if (data?.code === 200) {
      const { accessToken } = data?.data;
      yield put(loginProcAction.success(data));
      yield put(loginRequestAction({ accessToken }));
    } else {
      yield put(loginProcAction.failure(data));
    }
  } catch (error) {
    console.error('Error : ', error);
    yield put(loginProcAction.failure(API_DEFAULT_ERROR_RESPONSE));
  }
}

function* loginSaga(action: AuthAction) {
  const { accessToken } = action.payload;
  const decodeToken = getDecodeToken(accessToken);

  yield put(
    loginSuccessAction({
      accessToken,
      memberId: decodeToken?.memberId || 0,
      companyId: decodeToken?.companyId || 0,
    }),
  );
}

function* logoutSaga() {
  if (isServer()) {
    yield put(logoutSuccessAction(0));
  } else {
    const { data } = yield call(relayLogout);
    if (data?.code === 200) {
      yield put(logoutSuccessAction(0));
    }
  }
}

export default function* authSaga() {
  yield takeLatest(loginProcAction.request, loginProcSaga);

  yield takeLatest(loginRequestAction, loginSaga);

  yield takeLatest(logoutRequestAction, logoutSaga);
}
