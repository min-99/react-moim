import React, { useMemo } from 'react';
import styled from 'styled-components';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { RootAppDefaultPagePropsType } from '@pages/_app';

export interface LayoutPropsType extends RootAppDefaultPagePropsType {
  children: React.ReactChild;
  /**
   * 헤더를 숨긴다.
   */
  hiddenHeader?: boolean;
  /**
   * 푸터를 숨긴다.
   */
  hiddenFooter?: boolean;
  /**
   * 헤더에 로고만 보이도록한다.
   */
  headerOnlyLogo?: boolean;
  /**
   * 레이아웃 width 100%
   */
  fullWidth?: boolean;
  /**
   * 고정된 minWidth 설정
   */
  fixedMinWidth?: string | number | null;
}

function Layout({
  hiddenHeader,
  hiddenFooter,
  headerOnlyLogo,
  children,
  fullWidth,
  fixedMinWidth,
}: LayoutPropsType) {
  const minWidth = useMemo(() => {
    if (fullWidth) return null;
    return fixedMinWidth;
  }, [fixedMinWidth, fullWidth]);
  let mainStyled = {};
  if (!hiddenFooter) {
    mainStyled = { paddingBottom: '56px' };
  }
  return (
    <div>
      <div
        style={{
          minWidth: minWidth ?? '100%',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        {!hiddenHeader && <Header />}
        <Main style={mainStyled}>{children}</Main>
        {!hiddenFooter && <Footer />}
      </div>
    </div>
  );
}

export default Layout;

const Main = styled.main`
  margin: 0 auto;
  flex: 1;
  width: 100%;
`;
