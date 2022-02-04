import React from 'react';
import { withAuthPage } from '@/service/authService';
import { RootAppDefaultPagePropsType } from '@pages/_app';
import Detail from '@/func-components/MyMoim/Detail';

export interface MyMoimDetailPagePropsType extends RootAppDefaultPagePropsType {
  moimId: number;
}

function MyMoimDetailPage(props: MyMoimDetailPagePropsType) {
  return <Detail {...props} />;
}

export default withAuthPage(MyMoimDetailPage);

export const getServerSideProps = withAuthPage.getServerSideProps(
  async ({
    context: {
      query: { moimId },
    },
  }) => {
    return {
      props: {
        moimId,
        hiddenFooter: true,
        hiddenHeader: true,
      },
    };
  },
);
