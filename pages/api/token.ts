// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { RefreshTokenResponseType } from '@/api';
import { silentRefreshTokenCookieSyncStoreFromServer } from '@/service/authService';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<RefreshTokenResponseType>,
) => {
  if (req.method === 'POST') {
    try {
      const data =
        await silentRefreshTokenCookieSyncStoreFromServer<RefreshTokenResponseType>(
          {
            req,
            res,
            success: (data) => data,
            failure: (data) => data,
          },
        );
      // 리프레수 api
      res.status(200).json(data);
    } catch (e) {
      console.error(e);
      res.status(500).json({
        accessToken: '',
        refreshToken: '',
      } as RefreshTokenResponseType);
    }
  } else {
    res.status(405).json({
      accessToken: '',
      refreshToken: '',
    } as RefreshTokenResponseType);
  }
};

export default handler;
