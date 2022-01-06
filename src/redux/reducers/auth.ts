import { ActionType, createAsyncAction, createAction } from 'typesafe-actions';
import produce from 'immer';
import { HYDRATE } from 'next-redux-wrapper';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { LoginRequestType, LoginResponseType } from '@/api';
import { API_DEFAULT_RESPONSE } from '@/constants';
// import { AuthInfoType } from '@/types';

export const actionTypes = {
  LOGIN_REQUEST: 'auth/LOGIN_REQUEST',
  LOGIN_SUCCESS: 'auth/LOGIN_SUCCESS',
  LOGIN_FAILURE: 'auth/LOGIN_FAILURE',
};

export const loginAction = createAsyncAction(
  actionTypes.LOGIN_REQUEST,
  actionTypes.LOGIN_SUCCESS,
  actionTypes.LOGIN_FAILURE,
)<LoginRequestType, LoginResponseType, unknown>();

const actions = { loginAction };

export type AuthAction = ActionType<typeof actions>;

export interface AuthStateType {
  loginLoading: boolean;
  loginResponse: LoginResponseType;
}

export const initialState: AuthStateType = {
  loginLoading: false,
  loginResponse: API_DEFAULT_RESPONSE,
};

const AuthReducer = persistReducer(
  {
    storage,
    key: '__eb_at',
    whitelist: [],
  },
  (state: AuthStateType = initialState, action: AuthAction) =>
    produce(state, (draft) => {
      switch (action.type) {
        case HYDRATE: {
          console.log('HYDRATE AUTH');
          const { loginResponse } = action.payload.auth as AuthStateType;
          draft.loginResponse = loginResponse;
          break;
        }
        case actionTypes.LOGIN_REQUEST: {
          draft.loginLoading = true;
          draft.loginResponse = API_DEFAULT_RESPONSE;
          break;
        }
        case actionTypes.LOGIN_SUCCESS: {
          draft.loginLoading = false;
          draft.loginResponse = { ...action.payload };
          break;
        }
        case actionTypes.LOGIN_FAILURE: {
          draft.loginLoading = false;
          draft.loginResponse = { ...action.payload };
          break;
        }
        default:
          break;
      }
    }),
);

export default AuthReducer;
