import React from 'react';
import AppHeader from '@/components/AppHeader/AppHeader';
import style from 'styled-components';
import { Avatar, Typography } from '@mui/material';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import LikeText from '@/components/LikeText';
import CommentText from '@/components/CommentText';

interface BoardDetailPropsType {
  moimId: number;
  boardId: number;
}

const BoardDetail = ({ moimId, boardId }: BoardDetailPropsType) => {
  return (
    <SBoardDetail>
      <AppHeader title="내 모임"></AppHeader>
      <div className="boardDetail_layout">
        <div className="boardDetail_top">
          <Avatar
            alt="image"
            src="https://img.khan.co.kr/news/2019/11/29/l_2019112901003607500286631.jpg"
            sx={{ width: 40, height: 40 }}
            style={{ display: 'inline-block' }}
          />
          <div className="profileName_layout">
            <Typography
              variant="h6"
              style={{
                display: 'inline-block',
              }}
            >
              탁민주
            </Typography>
            <Typography
              variant="h6"
              style={{
                display: 'inline-block',
              }}
            >
              2월 6일 오후 10시 50분
            </Typography>
          </div>
          <div className="profile_right">
            <Typography
              variant="h6"
              color="blue"
              style={{
                display: 'inline-block',
                verticalAlign: 'sub',
              }}
            >
              가입인사
            </Typography>
            <MoreVertOutlinedIcon style={{ verticalAlign: 'text-top' }} />
          </div>
        </div>
        <div className="boardDetail_middle">
          <Typography variant="h5" noWrap style={{ padding: '15px 2px' }}>
            가입인사입니다
          </Typography>
          <Typography
            variant="h5"
            style={{ fontWeight: 100, padding: '0px 2px' }}
          >
            가입 후 자기소개서를 작성해주세요 <br />
            (이틀이내 미작성시 탈퇴사유가 됩니다) <br />
            <br />
            <br />
            <br />
            <br />
            -------자기소개서 양식(필수입력사항)--------
            <br />
            <br />
            - 이름 : 탁민주 <br />
            <br />
            - 나이 : 24 <br />
            <br />
            - 구력 : 1년 <br />
            <br />
            - 거주지역 : 관악구 <br />
            <br />
            - 참석요일 : 주말 <br />
            <br />
            - 하고 싶은 말 : 잘부탁드립니다 <br />
            <br />
            <br />
            - 본인사진
            <br />
            ---------------
            <br />
            <br />
          </Typography>
        </div>
        <div className="boardDetail_bottom">
          <LikeText isLike={false} count={0} />
          <CommentText count={0} />
        </div>
      </div>
    </SBoardDetail>
  );
};

const SBoardDetail = style.div`
  & .boardDetail_layout {
    padding: 14px;
    & .boardDetail_top {
      display: flex;
      & .profileName_layout {
        display: inline-block;
        flex: 1;
        padding-left: 8px;
        & h6 {
          width: 100%;
        }
      }
    }

    & .boardDetail_bottom {
      border-top: 1px solid lightgray;
      border-bottom: 1px solid lightgray;
      padding: 4px 2px;
    }
  }
`;

export default BoardDetail;
