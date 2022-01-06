import React from 'react';
import renderForTest from '@/tests/renderForTest';
import Nav from '../Nav';
import { NAV_LIST } from '@fixtures/common';
import { fireEvent } from '@testing-library/dom';

describe('<Nav/>', () => {
  const handleClickNav = jest.fn();
  const setup = () =>
    renderForTest(<Nav list={NAV_LIST} handleClickNav={handleClickNav} />);

  it('렌더링테스트', () => {
    const { getByText } = setup();
    NAV_LIST.forEach(({ name }) => {
      getByText(new RegExp(name));
    });
  });

  it('네비 클릭', () => {
    const { getByText } = setup();
    const navItem = getByText(new RegExp(NAV_LIST[0].name));
    fireEvent.click(navItem);

    expect(handleClickNav).toBeCalledWith(0);
  });
});
