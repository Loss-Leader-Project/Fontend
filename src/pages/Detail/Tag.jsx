import React from 'react';
import styled from 'styled-components';
import { Chip } from '@mui/material';

function Tag({ infoData }) {
  return (
    <TagWrapper>
      {infoData?.labels?.map(({ id, label }) => {
        return (
          <Chip
            key={id}
            label={label} //태그는 백에서 데이터 넣을수 있는지 확인하고 하기
            variant='outlined'
            color='warning'
            size='small'
            className='tag'
          />
        );
      })}
    </TagWrapper>
  );
}

export default Tag;

const TagWrapper = styled.div`
  & .tag {
    margin: 0 0.5rem 1rem 0;
    font-weight: 700;
  }
`;
