import React from 'react';
import { createWrapper } from 'next-redux-wrapper';
import { applyMiddleware, compose, createStore, Store } from 'redux';
import createSagaMiddleware, { Task } from 'redux-saga';
import withReduxSaga from 'next-redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '@/redux/reducers';
import rootSaga from '@/redux/sagas';
import { persistStore } from 'redux-persist';
import { isClient } from '@/utils';
import { defaultInstance, relayInstance, setupAxios } from '@/api';
import { Persistor } from 'redux-persist/es/types';

export interface ReduxStoreType extends Store {
  sagaTask?: Task;
  __persistor?: Persistor;
}

/**
  외부 라이브러리 스토어 연동
 * @param 
 */
const connectStoreToExternalLib = (store: ReduxStoreType) => {
  // axios
  setupAxios({
    instance: defaultInstance,
    instanceKey: 'defaultInstance',
    store,
  });
};

export const makeStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];
  const enhander =
    process.env.NEXT_PUBLIC_STAGE === 'production'
      ? compose(applyMiddleware(...middlewares))
      : composeWithDevTools(applyMiddleware(...middlewares));

  const store = createStore(rootReducer, enhander) as unknown as ReduxStoreType;
  // broswer 환경인 경우에만 생성
  if (isClient()) store.__persistor = persistStore(store);

  store.sagaTask = sagaMiddleware.run(rootSaga);
  connectStoreToExternalLib(store);

  return store;
};

export const wrapper = createWrapper(makeStore, {
  debug: false,
});

const configureStore = (App: React.ComponentType<any>) => {
  return wrapper.withRedux(withReduxSaga(App));
};

export default configureStore;
