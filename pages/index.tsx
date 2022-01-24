import { withAuthPage } from '@/service/authService';
import React from 'react';

export function MainPage() {
  return <>메인페이지 입니다.</>;
}

export default withAuthPage(MainPage);

export const getServerSideProps = withAuthPage.getServerSideProps(async () => {
  return {
    props: {},
  };
});
