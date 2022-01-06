import { isDeploy } from '@/utils';
import { NextPageContext } from 'next';
import React from 'react';
// import Rollbar from 'rollbar';
import { NotFound, Unavailable } from '@/func-components/error';

interface ErrorPagePropsType {
  statusCode: number;
}

function RootError({ statusCode }: ErrorPagePropsType) {
  if (statusCode === 404) return <NotFound />;
  return <Unavailable />;
}

RootError.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  if (isDeploy() && !process.browser && statusCode !== 404) {
    console.log('Reporting error to Rollbar...');

    // const rollbar = new Rollbar({
    //   accessToken: process.env.ROLLBAR_SERVER_TOKEN,
    //   captureUncaught: true,
    //   captureUnhandledRejections: true,
    //   payload: {
    //     environment: process.env.NEXT_PUBLIC_STAGE,
    //   },
    // });

    // rollbar.error([err]);
  }

  if (isDeploy() && statusCode && statusCode >= 500 && statusCode < 600) {
    res?.writeHead(302, {
      Location: '/error',
    });
    res?.end();
  }

  return {
    statusCode,
    headerOnlyLogo: true,
  };
};

export default RootError;
