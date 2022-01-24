import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function SimpleBottomNavigation() {
  const router = useRouter();
  const [selectMenu, setSelectMenu] = React.useState<string>('/');

  useEffect(() => {
    router.push(selectMenu);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectMenu]);

  return (
    <footer>
      <Box style={{ position: 'fixed', bottom: 0, left: 0, width: '100%' }}>
        <BottomNavigation
          showLabels
          value={selectMenu}
          onChange={(event, newValue) => {
            setSelectMenu(newValue);
          }}
        >
          <BottomNavigationAction
            label="클래스"
            icon={<AccountBalanceRoundedIcon fontSize="small" />}
            value="/"
          />
          <BottomNavigationAction
            label="소모임"
            icon={<SearchRoundedIcon fontSize="small" />}
            value="/smallMoim"
          />
          <BottomNavigationAction
            label="내모임"
            icon={<ChatBubbleOutlineRoundedIcon fontSize="small" />}
            value="/myMoim"
          />
          <BottomNavigationAction
            label="더보기"
            icon={<MoreHorizRoundedIcon fontSize="small" />}
            value="/more"
          />
        </BottomNavigation>
      </Box>
    </footer>
  );
}
