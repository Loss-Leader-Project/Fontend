import Input from 'Components/common/Input';
import React, { useCallback, useState } from 'react';
import Row from './Row';
import { Rating } from '@mui/material';
import styled from 'styled-components';
import { brandColor, gray } from 'styles/theme';
import Editor from 'Components/Editor';
import Button from 'Components/common/Button';
import validation from 'utils/validation';
import { fetchCreateReview } from 'utils/api';

const TITLE_INIT_VALUE = '';
const RATING_INIT_VALUE = 3;
const EDITOR_INIT_VALUE = '';

const ReviewInsertPage = () => {
  const [editorValue, setEditorValue] = useState(EDITOR_INIT_VALUE);
  const [ratingValue, setRatingValue] = useState(RATING_INIT_VALUE);
  const [titleValue, setTitleValue] = useState(TITLE_INIT_VALUE);
  const [editorImgs, setEditorImgs] = useState([]);
  const [errors, setErrors] = useState({});
  const { titleRexge } = errors;
  const handleOnChange = useCallback(text => setEditorValue(text), []);
  const handleRatingOnChange = useCallback(({ target: { value } }) => setRatingValue(Number(value)), []);
  const handleTitleOnChange = useCallback(({ target: { value } }) => setTitleValue(value), []);
  const handleImgOnChange = imgUrl =>
    setEditorImgs(prev => [
      ...prev,
      {
        imageIdentify: imgUrl,
      },
    ]);

  const handleSubmit = e => {
    e.preventDefault();
    setErrors({});

    try {
      validation.check(({ emptyCheck, makeError, isPatternCheck, errors }) => {
        if (emptyCheck(titleValue)) {
          makeError('titleRexge', '제목을 입력해주세요.');
          return errors;
        }
        if (isPatternCheck('titleRexge', '제목에는 html을 입력하지 못합니다.', titleValue, /(<([^>]+)>)/gi)) {
          return errors;
        }
      });

      const payload = {
        star: ratingValue,
        title: titleValue,
        content: editorValue,
        imageIdentifyList: editorImgs,
      };

      console.log('payload=>', payload);
      const id = 1;
      const orderNumber = 2012211234;
      const storeId = 1;
      // path variabl : userid/orderNumber/storeId
      fetchCreateReview(`/reviwe/${id}/${orderNumber}/${storeId}`, payload).catch(alert);
    } catch (errors) {
      setErrors(errors);
    }
  };

  const handleClickReset = () => {
    setTitleValue(TITLE_INIT_VALUE);
    setEditorValue(EDITOR_INIT_VALUE);
    setRatingValue(RATING_INIT_VALUE);
    setErrors({});
  };

  return (
    <Wrapper>
      <form onSubmit={handleSubmit}>
        <Row text='이름' children={<Input flex='1' value='홍길동' disabled />} />
        <Row text='상품선택' children={<Input flex='1' placeholder='선택된 상품이없습니다.' />} />
        <Row
          text='평가'
          children={
            <CustomRating
              name='rating'
              onChange={handleRatingOnChange}
              value={ratingValue}
              precision={0.5}
              size='large'
              className='rating'
            />
          }
        />
        <Row
          text='제목'
          children={
            <Input
              flex='1'
              minLength='5'
              maxLength='100'
              placeholder='제목을 입력하세요.(최소 5자 이상)'
              value={titleValue}
              error={titleRexge?.isError}
              helperText={titleRexge?.message}
              onChange={handleTitleOnChange}
            />
          }
        />
        <Row text='내용' isColumn />
        <Editor editorValue={editorValue} setEditorValue={handleOnChange} imgOnChange={handleImgOnChange} />
        <ButtonWrapper>
          <Button text='초기화' width='50%' type='button' backgroundColor='#a1a1a1' onClick={handleClickReset} />
          <Button text='등록' width='50%' type='submit' />
        </ButtonWrapper>
      </form>
    </Wrapper>
  );
};

const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const Wrapper = styled.div`
  color: ${gray};
`;

const CustomRating = styled(Rating)`
  &.rating {
    color: ${brandColor};
  }
  &.MuiRating-root {
    align-items: center !important;
  }
`;

export default ReviewInsertPage;
