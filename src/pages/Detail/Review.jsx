import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

function Review() {
  return <Contain>sdsd</Contain>;
}

export default Review;

const Contain = styled.div`
  width: 28rem;
  ${({ theme }) => theme.media.mobile} {
    width: 20rem;
  }
`;
