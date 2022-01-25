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
import { isServer } from '@/utils';
import { getDecodeToken } from '@/service/authService';

function* loginProcSaga(action: AuthAction) {
  try {
    const { data } = yield call(relayLogin, { ...action.payload });
    const { accessToken } = data;
    if (accessToken) {
      yield put(loginProcAction.success(data));
      yield put(loginRequestAction({ accessToken }));
    } else {
      yield put(loginProcAction.failure(data));
    }
  } catch (error) {
    console.error('Error : ', error);
    yield put(loginProcAction.failure({ accessToken: '', refreshToken: '' }));
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
