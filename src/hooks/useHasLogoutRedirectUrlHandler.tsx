import { RootStateType } from '@/redux/reducers';
import { changeHasLogoutRedirectUrl } from '@/redux/reducers/auth';
import { useCallback } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

/**
 * 로그아웃시 리다이렉트 url 가질수 있는지를 컨트롤한다.
 * @returns
 */
function useHasLogoutRedirectUrlHandler() {
  const dispatch = useDispatch();
  const { hasLogoutRedirectUrl } = useSelector(
    ({ auth: { hasLogoutRedirectUrl } }: RootStateType) => ({
      hasLogoutRedirectUrl,
    }),
    shallowEqual,
  );

  const makeNotHasRedirectUrl = useCallback(() => {
    dispatch(changeHasLogoutRedirectUrl(false));
  }, [dispatch]);

  return {
    hasLogoutRedirectUrl,
    makeNotHasRedirectUrl,
  };
}

export default useHasLogoutRedirectUrlHandler;
