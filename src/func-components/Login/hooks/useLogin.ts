import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { RootStateType } from '@/redux/reducers';
import { useRouter } from 'next/dist/client/router';
import { loginProcAction } from '@/redux/reducers/auth';
import { getDecodeToken } from '@/service/authService/lib';
import localforage from 'localforage';

function useLogin() {
  const hookForm = useForm();

  const dispatch = useDispatch();
  const router = useRouter();

  const storage = localforage.createInstance({
    name: '_checkedId',
    driver: localforage.LOCALSTORAGE,
  });

  const [isSaveIdChecked, setIsSaveIdChecked] = useState<boolean>(false);
  const [isLoginSuccess, setIsLoginSuccess] = useState<boolean>(true);

  const handleLogin = useCallback(
    (formData) => {
      dispatch(loginProcAction.request({ ...formData }));
    },
    [dispatch],
  );

  const { isLoadingLogin, loginResponse } = useSelector(
    ({
      auth: {
        loginProcLoading: isLoadingLogin,
        loginProcResponse: loginResponse,
      },
    }: RootStateType) => ({
      isLoadingLogin,
      loginResponse,
    }),

    shallowEqual,
  );

  const clearLoginProc = useCallback(() => {
    dispatch(loginProcAction.cancel(0));
  }, [dispatch]);

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
  }, [clearLoginProc, isSaveIdChecked, loginResponse, router, storage]);

  const { setValue } = hookForm;
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

  return { hookForm, handleLogin, isLoadingLogin };
}

export default useLogin;
