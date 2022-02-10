import {
  GetCategoryListResponseType,
  getCategoryListUrlWithQuery,
} from '@/api/common';
import { SelectChangeEvent } from '@mui/material';
import { useState } from 'react';
import useSWR from 'swr';

interface useBoardTabPropsType {
  moimId: number;
}

function useBoardTab({ moimId }: useBoardTabPropsType) {
  // 카테고리 리스트
  const { data: categoryListApiResponse } = useSWR<GetCategoryListResponseType>(
    getCategoryListUrlWithQuery({}),
  );

  const [categoryId, setCategoryId] = useState<string>('');

  const handleChange = (event: SelectChangeEvent) => {
    setCategoryId(event.target.value as string);
  };

  return {
    categoryListApiResponse: categoryListApiResponse?.data,
    categoryId,
    handleChange,
  };
}

export default useBoardTab;
