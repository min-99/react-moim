import React from 'react';
import styled from 'styled-components';
import { Typography } from '@mui/material';
import MeetingList from '../meeting/List';
import MemberList from '../MemberList';

const InfoTab = () => {
  return (
    <div>
      <img
        src="https://img.khan.co.kr/news/2019/11/29/l_2019112901003607500286631.jpg"
        alt="배드민턴"
        style={{ maxHeight: '50%' }}
      />
      <SInfoContentLayout>
        <Typography variant="h4">배드민턴 포텐셜</Typography>
        <Typography
          variant="h6"
          fontWeight={100}
          style={{ paddingTop: '9px', paddingBottom: '30px' }}
        >
          신림 & 구로 2030
          <br />
          게임 로테이션 가능
          <br />
          성인 ~ 83년생(빠른X)/그 외 운영진 협의
          <br />
          월회비 - 3000원(연납 3만원)
          <br />
          <br />
          화,금 - 오후 6시 국사봉체육관
          <br />
          토,일 - 멤버성립시 개설
          <br />
          <br />
          지정콕 : 모임장에게 문의
          <br />
          개인장비 (라켓, 배드민턴화, 셔틀콕) 필수
          <br />
          <br />
          문의사항은 카톡 오픈채팅 포텐셜 가입상담
          <br />
          '모임단톡방' 운동참여후 운영진 통해 초대
          <br />
          <br />
          강퇴요건
          <br />
          - 실력은 있으나 매너 부족
          <br />
          - 당일 자기소개 미작성
          <br />
          - 가입 후 2주 이내 회비 미납부
          <br />
        </Typography>
        <div>
          <Typography variant="h4" style={{ padding: '4px 0px' }}>
            모임 정모
          </Typography>
        </div>
        <MeetingList />
        <div style={{ marginTop: '30px' }}>
          <Typography variant="h4" style={{ padding: '4px 0px' }}>
            모임 멤버(126명)
          </Typography>
        </div>
        <MemberList />
      </SInfoContentLayout>
    </div>
  );
};

const SInfoContentLayout = styled.div`
  padding: 17px;
`;

export default InfoTab;
