import React from 'react';
import styled from 'styled-components';
import { Chip } from '@mui/material';

function Tag({ hashTag }) {
  return (
    <TagWrapper>
      {hashTag?.map(({ id, name }) => {
        return <Chip key={id} label={name} variant='outlined' color='warning' size='small' className='tag' />;
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
