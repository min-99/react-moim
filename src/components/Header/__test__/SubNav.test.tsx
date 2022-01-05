import React from 'react';
import renderForTest from '@/tests/renderForTest';
import SubNav from '../SubNav';
import { NAV_LIST } from '@fixtures/common';

describe('<SubNav/>', () => {
  const subList = NAV_LIST[0].subNavList;
  const setup = () => renderForTest(<SubNav list={subList} />);

  it('렌더링테스트', () => {
    const { getByText } = setup();
    subList.forEach(({ name }) => {
      getByText(new RegExp(name));
    });
  });
});
