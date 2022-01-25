import { ActionType, createAsyncAction, createAction } from 'typesafe-actions';
import produce from 'immer';
import { HYDRATE } from 'next-redux-wrapper';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { LoginRequestType, LoginResponseType } from '@/api';
import { API_DEFAULT_RESPONSE } from '@/constants';
import { AuthInfoType } from '@/types';

export const actionTypes = {
  LOGIN_PROC_REQUEST: 'auth/LOGIN_PROC_REQUEST',
  LOGIN_PROC_SUCCESS: 'auth/LOGIN_PROC_SUCCESS',
  LOGIN_PROC_FAILURE: 'auth/LOGIN_PROC_FAILURE',
  LOGIN_PROC_CANCEL: 'auth/LOGIN_PROC_CANCEL',
  LOGIN_REQUEST: 'auth/LOGIN_REQUEST',
  LOGIN_SUCCESS: 'auth/LOGIN_SUCCESS',
  LOGOUT_REQUEST: 'auth/LOGOUT_REQUEST',
  LOGOUT_SUCCESS: 'auth/LOGOUT_SUCCESS',
  CHANGE_HAS_LOGOUT_REDIRECT_URL: 'auth/CHANGE_HAS_LOGOUT_REDIRECT_URL',
};

export const loginProcAction = createAsyncAction(
  actionTypes.LOGIN_PROC_REQUEST,
  actionTypes.LOGIN_PROC_SUCCESS,
  actionTypes.LOGIN_PROC_FAILURE,
  actionTypes.LOGIN_PROC_CANCEL,
)<LoginRequestType, LoginResponseType, LoginResponseType, unknown>();

export const loginRequestAction = createAction(actionTypes.LOGIN_REQUEST)<{
  accessToken: string;
}>();

export const loginSuccessAction = createAction(
  actionTypes.LOGIN_SUCCESS,
)<AuthInfoType>();

export const logoutRequestAction = createAction(
  actionTypes.LOGOUT_REQUEST,
)<unknown>();

export const logoutSuccessAction = createAction(
  actionTypes.LOGOUT_SUCCESS,
)<unknown>();

/**
 * 로그아웃시 리다이렉트 url 가질수있는지에 대한 상태 액션
 */
export const changeHasLogoutRedirectUrl = createAction(
  actionTypes.CHANGE_HAS_LOGOUT_REDIRECT_URL,
)<boolean>();

const actions = {
  loginProcAction,
  loginRequestAction,
  loginSuccessAction,
  logoutRequestAction,
  logoutSuccessAction,
  changeHasLogoutRedirectUrl,
};

export type AuthAction = ActionType<typeof actions>;

export interface AuthStateType {
  loginProcLoading: boolean;
  loginProcResponse: LoginResponseType;
  isLogged: boolean;
  authInfo: AuthInfoType | null;
  hasLogoutRedirectUrl: boolean;
}

export const initialState: AuthStateType = {
  loginProcLoading: false,
  loginProcResponse: {
    accessToken: '',
    refreshToken: '',
  },
  isLogged: false,
  authInfo: null,
  hasLogoutRedirectUrl: true,
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
          const { isLogged, authInfo } = action.payload.auth as AuthStateType;
          draft.isLogged = isLogged;
          draft.authInfo = {
            ...authInfo,
          } as AuthInfoType;
          break;
        }
        case actionTypes.LOGIN_PROC_REQUEST: {
          draft.loginProcLoading = true;
          draft.loginProcResponse = {
            accessToken: '',
            refreshToken: '',
          };
          break;
        }
        case actionTypes.LOGIN_PROC_SUCCESS: {
          draft.loginProcLoading = false;
          draft.loginProcResponse = { ...action.payload };
          break;
        }
        case actionTypes.LOGIN_PROC_FAILURE: {
          draft.loginProcLoading = false;
          draft.loginProcResponse = { ...action.payload };
          break;
        }
        case actionTypes.LOGIN_PROC_CANCEL: {
          draft.loginProcLoading = false;
          draft.loginProcResponse = {
            accessToken: '',
            refreshToken: '',
          };
          break;
        }
        case actionTypes.LOGIN_SUCCESS: {
          console.log('LOGIN_SUCCESS');
          draft.isLogged = true;
          draft.authInfo = { ...action.payload };
          break;
        }
        case actionTypes.LOGOUT_SUCCESS: {
          draft.isLogged = false;
          draft.authInfo = null;
          break;
        }
        case actionTypes.CHANGE_HAS_LOGOUT_REDIRECT_URL: {
          draft.hasLogoutRedirectUrl = action.payload;
          break;
        }

        default:
          break;
      }
    }),
);

export default AuthReducer;
