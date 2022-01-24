import React, { useEffect } from 'react';
import { wrapper, ReduxStoreType } from '@/redux/store';
import { useRouter } from 'next/dist/client/router';
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextPage,
  NextPageContext,
} from 'next';
import { ParsedUrlQuery } from 'querystring';
import { END } from 'redux-saga';
import { AppInitialProps } from 'next/app';
import { loginRequestAction, logoutRequestAction } from '@/redux/reducers/auth';
import { ApiResponseType } from '@/types';
import { AxiosResponse } from 'axios';
import { isExpireTokenByStatusCode } from '@/api';
import { IncomingMessage, ServerResponse } from 'http';
import { API_REFRESH_FAILURE_ERROR_RESPONSE } from '@/constants';
import { LayoutPropsType } from '@/components/Layout/Layout';
import {
  getAccessTokenCookie,
  getLoginPageUrlWithRedirect,
  getRefreshTokenCookie,
  isAuthenticatedTokenCookieFromServer,
  shouldRefreshTokenCookieFromServer,
  silentRefreshTokenCookieSyncStoreFromServer,
} from './lib';
import { useDispatch } from 'react-redux';
import useHasLogoutRedirectUrlHandler from '@/hooks/useHasLogoutRedirectUrlHandler';

export interface WithAuthRouteOptionsType {
  doNotAuth?: boolean;
}

function WithAuthPage<P extends {}>(
  Component: React.ComponentType<P>,
  options: WithAuthRouteOptionsType = { doNotAuth: false },
) {
  const Wrapped = (props: P) => {
    const { hasLogoutRedirectUrl } = useHasLogoutRedirectUrlHandler();
    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
      const { doNotAuth } = options;
      if (!doNotAuth) {
        router.push(
          hasLogoutRedirectUrl
            ? getLoginPageUrlWithRedirect(router.asPath)
            : '/login',
        );
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, hasLogoutRedirectUrl, router]);

    return <Component {...props} />;
  };
  return Wrapped;
}

export default WithAuthPage;

/**
 *
 * @param asyncCallback
 *  @argument context
 *  @argument store
 * @returns
 */
WithAuthPage.getInitialAppProps = (
  asyncCallback: (
    context: NextPageContext,
    store: ReduxStoreType,
  ) => Promise<AppInitialProps>,
) => {
  const syncTokenCookieToStore = async (
    ctx: NextPageContext,
    store: ReduxStoreType,
  ) => {
    const req = ctx.req as IncomingMessage;
    const res = ctx.res as ServerResponse;
    console.log('syncTokenCookieToStore');
    if (isAuthenticatedTokenCookieFromServer(req, res))
      store.dispatch(
        loginRequestAction({
          accessToken: getAccessTokenCookie(req, res),
        }),
      );
  };
  return wrapper.getInitialAppProps(
    (store) =>
      async ({
        Component,
        ctx,
      }: {
        Component: NextPage;
        ctx: NextPageContext;
      }) => {
        const pageProps: any = Component.getInitialProps
          ? await Component.getInitialProps(ctx)
          : {};
        if (ctx.req?.headers) syncTokenCookieToStore(ctx, store);

        const result = await asyncCallback(ctx, store);

        return {
          ...result,
          pageProps: {
            ...pageProps,
            ...result.pageProps,
            referer: ctx.req?.headers.referer,
          },
        };
      },
  );
};

interface WithAuthPageGetServerSidePropsAsyncCallbackType<Q extends {}> {
  context: GetServerSidePropsContext<Q>;
  store: ReduxStoreType;
  apiPreProcessor: <REQ extends {}, RESPONSE extends ApiResponseType>(
    api: (reqArg?: REQ) => Promise<AxiosResponse<RESPONSE>>,
    reqArg?: REQ,
  ) => Promise<AxiosResponse<RESPONSE>>;
}

/**
 *
 * @param asyncCallback
 *  @argument context
 *  @augments store
 *  @apiPreProcessor api 호출시 전처리(리프레쉬 토큰 등)
 * @param doNotAuth
 * @returns
 */
WithAuthPage.getServerSideProps = <
  Q extends ParsedUrlQuery,
  P extends { [key: string]: any } | LayoutPropsType,
>(
  asyncCallback: ({
    context,
    store,
    apiPreProcessor,
  }: WithAuthPageGetServerSidePropsAsyncCallbackType<Q>) => Promise<
    GetServerSidePropsResult<P>
  >,
  doNotAuth?: boolean,
) => {
  return wrapper.getServerSideProps<P>((store) => async (context) => {
    const { req, res } = context;

    let topPriorityRefreshToken = getRefreshTokenCookie(req, res);

    const redirectLoginPage = async (): Promise<
      GetServerSidePropsResult<P>
    > => {
      const redirectUrl = (req.url as string)
        .replace(/^\/_next\/data\/(.(?!\/))+(.){1}/, '')
        .replace('.json', '')
        .replace(/^\/index$/, '/');

      return {};
      return {
        redirect: {
          statusCode: 302,
          destination: getLoginPageUrlWithRedirect(redirectUrl),
        },
      };
    };

    if (!doNotAuth) {
      if (shouldRefreshTokenCookieFromServer(req, res)) {
        const result = await silentRefreshTokenCookieSyncStoreFromServer<{
          isRedirect: boolean;
          refreshToken?: string;
        }>({
          req,
          res,
          success: ({
            data: { accessToken, refreshToken = '' } = {
              accessToken: '',
              refreshToken: '',
            },
          }) => {
            store.dispatch(
              loginRequestAction({
                accessToken: accessToken as string,
              }),
            );
            return {
              isRedirect: false,
              refreshToken,
            };
          },
          failure: () => {
            store.dispatch(logoutRequestAction(0));
            return {
              isRedirect: true,
            };
          },
        });

        topPriorityRefreshToken = result?.refreshToken
          ? result?.refreshToken
          : topPriorityRefreshToken;

        if (result?.isRedirect) return redirectLoginPage();
      } else if (!isAuthenticatedTokenCookieFromServer(req, res)) {
        return redirectLoginPage();
      }
    }

    let isFailureRefreshByApiPreProcessor = false;
    const apiPreProcessor = async (
      api: (reqArg?: any) => Promise<AxiosResponse<any>>,
      reqArg?: any,
    ) => {
      // 리프레쉬 실패 상태인경우 API 호출 중단
      if (isFailureRefreshByApiPreProcessor) {
        return {
          data: API_REFRESH_FAILURE_ERROR_RESPONSE,
        } as AxiosResponse<any>;
      }

      const result = await api(reqArg);
      if (isExpireTokenByStatusCode(result?.data?.code)) {
        const isSuccess =
          await silentRefreshTokenCookieSyncStoreFromServer<boolean>({
            req,
            res,
            topPriorityRefreshToken,
            success: ({
              data: { accessToken } = {
                accessToken: '',
              },
            }) => {
              store.dispatch(
                loginRequestAction({
                  accessToken: accessToken as string,
                }),
              );
              return true;
            },
            failure: () => {
              store.dispatch(logoutRequestAction(0));
              return false;
            },
          });

        if (isSuccess) return await api(reqArg);
        else isFailureRefreshByApiPreProcessor = true;
      }
      return result;
    };

    const result = await asyncCallback({
      context: context as GetServerSidePropsContext<Q>,
      store,
      apiPreProcessor,
    });

    if (!doNotAuth && isFailureRefreshByApiPreProcessor)
      return redirectLoginPage();

    store.dispatch(END);
    await (store as unknown as ReduxStoreType).sagaTask?.toPromise();

    return { ...result };
  });
};
