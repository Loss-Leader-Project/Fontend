import React, { useEffect, useState } from 'react';
import { Container, Grid, Stack } from '@mui/material';
import styled from 'styled-components';

let Hambuger = styled('img')`
  display: block;

  ${({ theme }) => theme.media.pc} {
    width: 40px;
  }
  ${({ theme }) => theme.media.tab} {
    width: 30px;
  }
`;

let Logo = styled('img')`
  display: block;
  margin-left: -40px;
  ${({ theme }) => theme.media.pc} {
    width: 300px;
  }
  ${({ theme }) => theme.media.tab} {
    width: 200px;
    margin-left: 0px;
  }
`;

const Header = () => {
  let screen = window.innerWidth;

  let [flag, SetFlag] = useState(true);

  useEffect(() => {
    screen <= 600 ? SetFlag(false) : SetFlag(true);
  }, []);

  window.addEventListener('resize', () => {
    screen = window.innerWidth;
    screen <= 600 ? SetFlag(false) : SetFlag(true);
  });

  return (
    <Container>
      <Grid
        container
        direction='row'
        justifyContent='center'
        alignItems='center'
      >
        <Grid item lg={2} md={2} sm={3} xs={2}>
          <Hambuger
            src={`${process.env.PUBLIC_URL}/images/hambuger.png`}
            alt='hamburger'
          ></Hambuger>
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
        {flag && (
          <Grid item lg={2} md={2} sm={3}>
            <Stack
              direction='row'
              justifyContent='center'
              alignItems='center'
              spacing={2}
            >
              <div>회원가입</div>
              <div>로그인</div>
            </Stack>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default Header;
