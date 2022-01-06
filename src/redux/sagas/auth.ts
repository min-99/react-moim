import { call, put, takeLatest } from 'redux-saga/effects';
import { AuthAction, loginAction } from '@/redux/reducers/auth';
import { API_DEFAULT_ERROR_RESPONSE } from '@/constants';
import { login } from '@/api';

function* loginSaga(action: AuthAction) {
  try {
    const { data } = yield call(login, { ...action.payload });
    if (data?.code === 200) {
      yield put(loginAction.success(data?.data));
    } else {
      yield put(loginAction.failure(data?.data));
    }
  } catch (error) {
    console.error('Error : ', error);
    yield put(loginAction.failure(API_DEFAULT_ERROR_RESPONSE));
  }
}

export default function* authSaga() {
  yield takeLatest(loginAction.request, loginSaga);
}
