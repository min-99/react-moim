// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { login, LoginResponseType } from '@/api';
import { API_DEFAULT_ERROR_RESPONSE } from '@/constants';
import { cookieLoginFromServer } from '@/service/authService/lib';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<LoginResponseType>,
) => {
  if (req.method === 'POST') {
    try {
      const { data } = await login({ ...req.body });
      if (data.code === 200)
        cookieLoginFromServer(req, res, {
          accessToken: data.data?.accessToken as string,
          refreshToken: data.data?.refreshToken as string,
        });

      res.status(200).json(data);
    } catch (e) {
      console.error(e);
      res.status(500).json(API_DEFAULT_ERROR_RESPONSE);
    }
  } else {
    res.status(405).json({
      code: 405,
      message: 'Method not allowed',
    });
  }
};

export default handler;
