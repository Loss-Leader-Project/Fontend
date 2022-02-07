import React from 'react';
import { Container, Grid, Stack } from '@mui/material';
import styled from 'styled-components';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

let Logo = styled('img')`
  display: block;
  margin-left: -2.5rem;
  ${({ theme }) => theme.media.pc} {
    width: 300px;
  }
  ${({ theme }) => theme.media.tab} {
    width: 200px;
    margin-left: 0px;
  }
`;

let User = styled(Grid)`
  ${({ theme }) => theme.media.mobile} {
    display: none;
  }
`;

const Header = () => {
  return (
    <Container>
      <Grid
        container
        direction='row'
        justifyContent='center'
        alignItems='center'
      >
        <Grid item lg={2} md={2} sm={3} xs={2}>
          <FontAwesomeIcon icon={faBars} size='2x' />
        </Grid>
        <Grid
          item
          lg={8}
          md={8}
          sm={6}
          xs={10}
          display='flex'
          justifyContent='center'
        >
          <Logo
            src={`${process.env.PUBLIC_URL}/images/LossLeader_logo_pc.png`}
            alt='logo'
          ></Logo>
        </Grid>
        <User item lg={2} md={2} sm={3}>
          <Stack
            direction='row'
            justifyContent='center'
            alignItems='center'
            spacing={2}
          >
            <div>회원가입</div>
            <div>로그인</div>
          </Stack>
        </User>
      </Grid>
    </Container>
  );
};

export default Header;
