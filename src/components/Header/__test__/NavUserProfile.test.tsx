import React from 'react';
import renderForTest from '@/tests/renderForTest';
import NavUserProfile from '../NavUserProfile';
import { fireEvent } from '@testing-library/dom';
import { waitFor } from '@testing-library/react';

describe('<NavUserProfile/>', () => {
  const handleLogout = jest.fn();
  const handleGoMyProfile = jest.fn();
  const setup = () =>
    renderForTest(
      <NavUserProfile
        memberName="테스트맨"
        companyName={''}
        handleLogout={handleLogout}
        handleGoMyProfile={handleGoMyProfile}
      />,
    );

  it('렌더링테스트', () => {
    const { getByText } = setup();
    getByText('테스트맨');
  });

  it('로그아웃 클릭', async () => {
    const { getByText } = setup();
    const dropItem = getByText('테스트맨');

    fireEvent.click(dropItem);

    const logout = getByText('로그아웃');
    fireEvent.click(logout);

    await waitFor(() => {
      expect(handleLogout).toBeCalled();
    });
  });
  it('내정보클릭', async () => {
    const { getByText } = setup();
    const dropItem = getByText('테스트맨');

    fireEvent.click(dropItem);

    const goMyProfile = getByText('내정보');
    fireEvent.click(goMyProfile);

    await waitFor(() => {
      expect(handleGoMyProfile).toBeCalled();
    });
  });
});
