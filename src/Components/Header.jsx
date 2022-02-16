import React from 'react';
import { Container, Grid, Stack } from '@mui/material';
import styled from 'styled-components';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { mobile, pc, tab } from 'styles/theme';

const Header = () => {
  return (
    <CustomContainer>
      <Grid container direction='row' justifyContent='center' alignItems='center'>
        <Grid item lg={2} md={2} sm={3} xs={2}>
          <FontAwesomeIcon icon={faBars} size='2x' />
        </Grid>
        <CustomLogoGrid item lg={8} md={8} sm={6} xs={10}>
          <Link to='/'>
            <Logo src={`${process.env.PUBLIC_URL}/images/LossLeader_logo_pc.png`} alt='logo'></Logo>
          </Link>
        </CustomLogoGrid>
        <User item lg={2} md={2} sm={3}>
          <Stack direction='row' justifyContent='center' alignItems='center' spacing={2}>
            <Link to='/signup'>회원가입</Link>
            <Link to='/login'>로그인</Link>
          </Stack>
        </User>
      </Grid>
    </CustomContainer>
  );
};

const Logo = styled('img')`
  display: block;
  margin-left: -2.5rem;
  ${pc} {
    width: 18.75rem;
  }
  ${tab} {
    width: 12.5rem;
    margin-left: 0px;
  }
`;

const User = styled(Grid)`
  ${mobile} {
    display: none;
  }
`;

const CustomContainer = styled(Container)`
  margin: 2rem 0 3rem;
`;

const CustomLogoGrid = styled(Grid)`
  display: flex;
  justify-content: center;

  ${mobile} {
    justify-content: flex-end;
  }
`;

export default Header;
