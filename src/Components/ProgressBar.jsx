import React from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import CircularProgress from '@mui/material/CircularProgress';

const ProgressBar = () => {
  console.log('asdasd');
  return (
    <LoadingWrapper>
      <CircularProgress size={70} />
    </LoadingWrapper>
  );
};

export default ProgressBar;

const LoadingWrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  background: rgba(0, 0, 0, 0.5);
  overflow-y: hidden;
  width: 100%;
`;
