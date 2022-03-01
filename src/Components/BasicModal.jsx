import { Modal, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import styled from 'styled-components';
import { gray, lightDark, lightGray, mobile } from 'styles/theme';

const BasicModal = ({ open, handleClose, title, content }) => {
  /** 
  원하는 컴포넌트에 아래 코드를 붙히고 props로 넘기세요.
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  컴포넌트에서 하단 코드처럼 클릭시 모달이 나오길 원하는 곳에 작성해주세요.
  <Button onClick={handleOpen}>Open modal</Button>
  */

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <CustomBox>
        <ModalTitle id='modal-modal-title' variant='h4' component='h2'>
          {title}
        </ModalTitle>
        <ModalBody id='modal-modal-description' sx={{ mt: 4 }} variant='div' component='div'>
          {content}
        </ModalBody>
      </CustomBox>
    </Modal>
  );
};

export default BasicModal;

const ModalTitle = styled(Typography)`
  color: ${lightDark};
  padding-bottom: 1.25rem;
  border-bottom: 2px solid ${lightGray};
  &&& {
    ${mobile} {
      font-size: 1.5rem;
    }
  }
`;

const ModalBody = styled(Typography)`
  color: ${gray};
  height: 15.625rem;
  display: flex;
  flex-flow: column wrap;
  justify-content: space-evenly;
  &&& {
    margin-top: 0.625rem;
    ${mobile} {
      height: 150px;
    }
  }
`;

const CustomBox = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 400px;
  background-color: white;
  box-shadow: 24;
  padding: 35px;

  ${mobile} {
    width: 250px;
    height: 250px;
    padding: 20px;
  }
`;
