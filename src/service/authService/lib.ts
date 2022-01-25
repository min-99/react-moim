import { NextApiRequest, NextApiResponse } from 'next';
import { IncomingMessage, ServerResponse } from 'http';
import Cookies from 'cookies';
import decoder from 'jwt-decode';
import { DecodeTokenType } from '@/types';
import { refreshToken, RefreshTokenResponseType } from '@/api';

type ServerRequestType = NextApiRequest | IncomingMessage;
type ServerResponseType = NextApiResponse | ServerResponse;

export const getAccessTokenCookieName = () =>
  process.env.NEXT_PUBLIC_TOKEN_NAME as string;

export const getRefreshTokenCookieName = () =>
  process.env.NEXT_PUBLIC_REFRESH_TOKEN_NAME as string;

export const getCookieDomain = () =>
  process.env.NODE_ENV !== 'development'
    ? (process.env.NEXT_PUBLIC_COOKIE_DOMAIN as string)
    : '';

export const getAccessTokenCookie = (
  req: ServerRequestType,
  res: ServerResponseType,
) => new Cookies(req, res).get(getAccessTokenCookieName()) as string;

export const getRefreshTokenCookie = (
  req: ServerRequestType,
  res: ServerResponseType,
) => new Cookies(req, res).get(getRefreshTokenCookieName()) as string;

export const getDecodeToken = (token: string): DecodeTokenType => {
  try {
    return token ? decoder(token) : ({} as DecodeTokenType);
  } catch (error) {
    return {} as DecodeTokenType;
  }
};

export const expireToken = (token: string, addMillSec: number = 0) => {
  const decodeAToken = getDecodeToken(token);
  const atExpireMillSec = new Date(decodeAToken.exp * 1000).getTime();
  const nowMillSec = new Date().getTime();
  if (atExpireMillSec <= nowMillSec + addMillSec) {
    return true;
  }
  return false;
};
export const cookieLoginFromServer = (
  req: ServerRequestType,
  res: ServerResponseType,
  data: {
    accessToken: string;
    refreshToken: string;
  },
) => {
  const isNotLocal = process.env.NODE_ENV !== 'development';
  const cookies = new Cookies(req, res, {
    secure: isNotLocal,
  });
  const aToken = data?.accessToken;
  const decodeAToken = getDecodeToken(aToken);
  const atExpire = new Date(decodeAToken.exp * 1000);
  cookies.set(getAccessTokenCookieName(), aToken, {
    httpOnly: true,
    sameSite: 'lax',
    secure: isNotLocal,
    expires: atExpire,
    path: '/',
    domain: getCookieDomain(),
  });

  const rToken = data?.refreshToken;
  const decodeRToken = getDecodeToken(rToken);

  const rtExpire = new Date(decodeRToken.exp * 1000);
  cookies.set(getRefreshTokenCookieName(), rToken, {
    httpOnly: true,
    sameSite: 'lax',
    secure: isNotLocal,
    expires: rtExpire,
    path: '/',
    domain: getCookieDomain(),
  });
};

export const cookieLogoutFromServer = (
  req: ServerRequestType,
  res: ServerResponseType,
) => {
  const cookies = new Cookies(req, res);
  cookies.set(getAccessTokenCookieName(), '', {
    maxAge: -1,
    path: '/',
    domain: getCookieDomain(),
  });
  cookies.set(getRefreshTokenCookieName(), '', {
    maxAge: -1,
    path: '/',
    domain: getCookieDomain(),
  });
};

export const shouldRefreshTokenCookieFromServer = (
  req: ServerRequestType,
  res: ServerResponseType,
) => {
  const aToken = getAccessTokenCookie(req, res);
  const rToken = getRefreshTokenCookie(req, res);
  if (aToken && rToken) {
    // const addMillSec = 30 * 60 * 1000; // 30 분
    // return expireToken(aToken, addMillSec);
    return true;
  }

  if (!aToken && rToken) {
    return true;
  }

  return false;
};

export const isAuthenticatedTokenCookieFromServer = (
  req: ServerRequestType,
  res: ServerResponseType,
) => {
  const aToken = getAccessTokenCookie(req, res);
  return !!aToken;
};

/**
 * getServerSideProps 내부에서 사용
 * 리프레쉬 토큰 처리시 사용
 * @param param0
 * @returns
 */
export const silentRefreshTokenCookieSyncStoreFromServer = async <
  RETURN extends {},
>({
  req,
  res,
  topPriorityRefreshToken,
  success,
  failure,
}: {
  req: ServerRequestType;
  res: ServerResponseType;
  topPriorityRefreshToken?: string; // 해당토큰 있는경우 해당 토큰 기준으로 리프레쉬 수행
  success?: (data: RefreshTokenResponseType) => RETURN;
  failure?: (data: RefreshTokenResponseType) => RETURN;
}): Promise<RETURN> => {
  const { data } = await refreshToken({
    token: topPriorityRefreshToken || getRefreshTokenCookie(req, res),
  });
  if (data.accessToken) {
    const accessToken = data.accessToken as string;
    const refreshToken = data.refreshToken as string;
    cookieLoginFromServer(req, res, {
      accessToken,
      refreshToken,
    });
    console.log('server token refresh : true');
    if (success) return success?.(data);
  } else {
    cookieLogoutFromServer(req, res);
    console.log('server token refresh : false');
    if (failure) return failure?.(data);
  }
  return {} as RETURN;
};

export const getLoginPageUrlWithRedirect = (redirectUrl: string) =>
  `/login?redirectUrl=${redirectUrl}`;
