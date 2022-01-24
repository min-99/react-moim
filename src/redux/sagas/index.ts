import { all } from 'redux-saga/effects';
import auth from './auth';

const rootSaga = function* () {
  yield all([auth()]);
};

export default rootSaga;
