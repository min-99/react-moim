// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { login, LoginResponseType } from '@/api';
import { cookieLoginFromServer } from '@/service/authService/lib';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<LoginResponseType>,
) => {
  if (req.method === 'POST') {
    try {
      const { data } = await login({ ...req.body });
      if (data.accessToken)
        cookieLoginFromServer(req, res, {
          accessToken: data.accessToken as string,
          refreshToken: data.refreshToken as string,
        });

      res.status(200).json(data);
    } catch (e) {
      console.error(e);
      res.status(500).json({ accessToken: '', refreshToken: '' });
    }
  } else {
    res.status(405).json({
      accessToken: '',
      refreshToken: '',
    });
  }
};

export default handler;
