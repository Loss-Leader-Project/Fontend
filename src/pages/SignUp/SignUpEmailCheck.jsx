import { Checkbox, FormControlLabel, Grid, Stack } from '@mui/material';
import BasicModal from 'Components/BasicModal';
import React, { useState } from 'react';
import styled from 'styled-components';
import { brandColor, gray, lightDark, mobile } from 'styles/theme';
import SignUpMarketingTerm from './SignUpMarketingTerm';
import SignUpMustTerm from './SignUpMustTerm';

const SignUpEmailCheck = props => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <CustomGridContainer>
      <Grid item lg={3} md={3} sm={3} xs={3}></Grid>
      <Grid item lg={9} md={9} sm={9} xs={9}>
        <CustomStack direction='row' justifyContent='space-between' alignItems='center'>
          <CheckAgree
            name={props.name}
            control={<CheckBox checked={props.checkedAgree} onChange={props.handleChangeAgree} />}
            label={props.label}
          />
          <ShowTerms onClick={handleOpen}>약관보기</ShowTerms>
        </CustomStack>
        {props.name === 'agreeMail' && <Text>※ 아이디 및 비밀번호 찾기에 활용되므로 정확하게 입력해주세요.</Text>}
      </Grid>
      <BasicModal
        open={open}
        handleClose={handleClose}
        title={
          props.name === 'agreeMail' ? (
            <ModalTitle>(주)로스리더 개인정보 수집 및 이용동의</ModalTitle>
          ) : (
            <ModalTitle>마케팅 활용 및 광고성 정보수신 동의</ModalTitle>
          )
        }
        content={props.name === 'agreeMail' ? <SignUpMustTerm /> : <SignUpMarketingTerm />}
      />
    </CustomGridContainer>
  );
};

export default SignUpEmailCheck;

const Text = styled.p`
  color: ${gray};
  margin-top: 1.25rem;
  ${mobile} {
    font-size: 0.625rem;
  }
`;

const CustomGridContainer = styled(Grid).attrs(props => ({
  container: true,
  direction: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
}))`
  &&& {
    margin-top: 1rem;
  }
  color: ${gray};
`;

const CheckAgree = styled(FormControlLabel)`
  &&& {
    color: ${lightDark};
  }

  span {
    font-weight: 600;
  }

  .MuiFormControlLabel-label {
    ${mobile} {
      font-size: 0.625rem;
    }
  }
`;

const CheckBox = styled(Checkbox)`
  &&& {
    color: ${({ theme, checked }) => (checked ? theme.colors.brandColor : theme.colors.lightGray)};
    &:hover {
      color: ${brandColor};
    }
  }
`;

const ShowTerms = styled.span`
  font-size: 0.75rem;
  text-align: right;
  border-bottom: 1px solid ${gray};
  cursor: pointer;
  ${mobile} {
    font-size: 0.625rem;
  }
`;

const ModalTitle = styled.span`
  font-size: 1.25rem;
  font-weight: bold;
`;

const CustomStack = styled(Stack)`
  &&& {
    ${mobile} {
      flex-direction: column;
    }
  }
`;
