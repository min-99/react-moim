import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { loginProcAction } from '@/redux/reducers/auth';
import { RootStateType } from '@/redux/reducers';
import { useRouter } from 'next/dist/client/router';
import { getDecodeToken } from '@/services/authService';
import localforage from 'localforage';

function useLogin() {
  const storage = localforage.createInstance({
    name: 'id',
    driver: localforage.LOCALSTORAGE,
  });
  const hookForm = useForm({
    mode: 'onBlur',
  });
  const { setValue } = hookForm;
  const dispatch = useDispatch();
  const router = useRouter();
  const { loginResponse, loginLoading } = useSelector(
    ({ auth: { loginProcResponse, loginProcLoading } }: RootStateType) => ({
      loginResponse: loginProcResponse,
      loginLoading: loginProcLoading,
    }),

    shallowEqual,
  );

  const handleLogin = useCallback(
    (formData) => {
      dispatch(loginProcAction.request({ ...formData }));
    },
    [dispatch],
  );

  const clearLoginProc = useCallback(() => {
    dispatch(loginProcAction.cancel(0));
  }, [dispatch]);

  const [isSaveIdChecked, setIsSaveIdChecked] = useState<boolean>(false);

  const handleChangeSaveId = () => {
    setIsSaveIdChecked(!isSaveIdChecked);
  };

  const [isLoginSuccess, setIsLoginSuccess] = useState<boolean>(true);

  const afterLogin = useCallback(() => {
    const { code, message } = loginResponse;
    if (code === -1) return;

    switch (code) {
      case 200: {
        if (isSaveIdChecked && loginResponse && loginResponse.data) {
          const decodeToken = getDecodeToken(loginResponse.data.accessToken);

          storage.setItem('_id', decodeToken.user_name);
        } else {
          storage.removeItem('_id');
        }
        if (router.query.redirectUrl) {
          router.push(router.query.redirectUrl as string);
        } else {
          router.push('/');
        }
        break;
      }
      default:
        setIsLoginSuccess(false);
        break;
    }
    clearLoginProc();
  }, [clearLoginProc, isSaveIdChecked, loginResponse, router]);

  const checkLocalStorageHasId = useCallback(() => {}, []);

  useEffect(() => {
    storage
      .getItem('_id')
      .then(function (value) {
        setValue('id', value);
        value && setIsSaveIdChecked(true);
      })
      .catch(function (err) {
        setValue('id', '');
        console.log(err);
      });
  }, []);

  useEffect(() => {
    afterLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginResponse]);

  return {
    hookForm,
    handleLogin,
    loginLoading,
    isLoginSuccess,
    handleChangeSaveId,
    isSaveIdChecked,
    checkLocalStorageHasId,
  };
}

export default useLogin;
