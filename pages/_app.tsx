import React, { useEffect } from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import configStore, { ReduxStoreType } from '@/redux/store';
import Layout from '@/components/Layout';
import { SWRConfig } from 'swr';
import { swrFetcher } from '@/api';
// import { withAuthPage } from '@/services/authService';
// import '@/styles/globals.css';
// import '@/styles/react-big-calendar.css';
// import 'react-virtualized/styles.css';
import { PersistGate } from 'redux-persist/integration/react';
import { Persistor } from 'redux-persist/es/types';
import { useStore } from 'react-redux';
// import usePersistSync from '@/hooks/usePersistSync';
// import { PersistSyncStateType } from '@/redux/reducers/storage';
// import { UIThemeProvider, getRedefTheme, theme } from 'web-sdk-ui';
// import { ThemeProvider, ThemeConsumer } from 'styled-components';
// import AlertProvider from '@/providers/AlertProvider';
// import ConfirmProvider from '@/providers/ConfirmProvider';
// import ToastProvider from '@/providers/ToastProvider';
// import 'react-datepicker/dist/react-datepicker.css';
// import { storeTrackingAgent } from '@/services/trackingService';
// import TrackingProvider from '@/providers/TrackingProvider';
// import useFixLayoutWhenModal from '@/hooks/useFixLayoutWhenModal';
// import AlertLoaderProvider from '@/providers/AlertLoaderProvider';

export interface RootAppDefaultPagePropsType {
  referer?: string;
}

function RootApp(appProps: AppProps) {
  // useFixLayoutWhenModal();
  const store = useStore();
  // const { handlePersistSyncState, persistSyncState } = usePersistSync();

  useEffect(() => {
    console.log(`stage : ${process.env.NEXT_PUBLIC_STAGE}`);
  }, [store]);

  // console.log('RootApp persistSyncState state: ', persistSyncState);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <title>에디트홈</title>
      </Head>
      <PersistGate
        loading={null}
        persistor={(store as ReduxStoreType).__persistor as Persistor}
      >
        {(isSync) => (
          <PersistSyncApp
            {...appProps}
            isSync={isSync}
            // handlePersistSyncState={handlePersistSyncState}
          />
        )}
      </PersistGate>
    </>
  );
}

function PersistSyncApp({
  Component,
  pageProps,
  isSync,
  // handlePersistSyncState,
}: AppProps & {
  isSync: boolean;
  // handlePersistSyncState: (state: PersistSyncStateType) => void;
}) {
  // useEffect(() => {
  //   handlePersistSyncState(isSync ? 'DONE' : 'LOADING');
  // }, [handlePersistSyncState, isSync]);

  return (
    <>
      <SWRConfig
        value={{
          revalidateOnFocus: false,
          revalidateOnReconnect: false,
          fetcher: swrFetcher,
        }}
      >
        <Layout {...pageProps}>
                <Component {...pageProps} />
              </Layout>
      </SWRConfig>
    </>
  );
}

// RootApp.getInitialProps = withAuthPage.getInitialAppProps(
//   async (_context: any, _store: any) => {
//     // storeTrackingAgent(context, store);
//     return {
//       pageProps: {},
//     };
//   },
// );

export default configStore(RootApp);
