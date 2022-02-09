import React from 'react';
import { Container, Grid, Stack } from '@mui/material';
import styled from 'styled-components';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <Container>
      <Grid container direction='row' justifyContent='center' alignItems='center'>
        <Grid item lg={2} md={2} sm={3} xs={2}>
          <FontAwesomeIcon icon={faBars} size='2x' />
        </Grid>
        <Grid item lg={8} md={8} sm={6} xs={10} display='flex' justifyContent='center'>
          <Logo src={`${process.env.PUBLIC_URL}/images/LossLeader_logo_pc.png`} alt='logo'></Logo>
        </Grid>
        <User item lg={2} md={2} sm={3}>
          <Stack direction='row' justifyContent='center' alignItems='center' spacing={2}>
            <Link to='/signup'>회원가입</Link>
            <Link to='/login'>로그인</Link>
          </Stack>
        </User>
      </Grid>
    </Container>
  );
};

const Logo = styled('img')`
  display: block;
  margin-left: -2.5rem;
  ${({ theme }) => theme.media.pc} {
    width: 18.75rem;
  }
  ${({ theme }) => theme.media.tab} {
    width: 12.5rem;
    margin-left: 0px;
  }
`;

const User = styled(Grid)`
  ${({ theme }) => theme.media.mobile} {
    display: none;
  }
`;

export default Header;
