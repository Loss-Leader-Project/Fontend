import MuiInput from 'Components/MuiInput';
import React, { useCallback, useState } from 'react';
import { Rating } from '@mui/material';
import styled from 'styled-components';
import { brandColor, gray } from 'styles/theme';
import Editor from 'Components/Editor';
import Button from 'Components/Button';
import validation from 'utils/validation';
import { flexStyleGroup } from 'styles/theme';
import Title from 'Components/Title';
import { ApiRq } from 'utils/apiConfig';
import { myApiURL } from 'utils/apiUrl';

const TITLE_INIT_VALUE = '';
const RATING_INIT_VALUE = 3;
const EDITOR_INIT_VALUE = '';

const InsertPage = () => {
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

  const handleSubmit = async e => {
    e.preventDefault();
    setErrors({});

    const title = titleValue;

    try {
      validation.check(({ emptyCheck, makeError, isPatternCheck, errors }) => {
        if (emptyCheck(title)) {
          makeError('titleRexge', '제목을 입력해주세요.');
          return errors;
        }
        if (isPatternCheck('titleRexge', '제목에는 html을 입력하지 못합니다.', title, /(<([^>]+)>)/gi)) {
          return errors;
        }
      });
      const content = editorValue.replace(/</g, '&lt;');

      const payload = {
        star: ratingValue,
        title,
        content,
        imageIdentifyList: editorImgs,
      };
      const id = 1;
      const orderNumber = 2012211234;
      const storeId = 1;
      const pathVariable = `/${id}/${orderNumber}/${storeId}`;
      await ApiRq('post', myApiURL.POST_CREATE_REVIEW(pathVariable), '', payload).catch(alert);
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
        <RowWrapper>
          <Text>이름</Text>
          <MuiInput value='홍길동' disabled />
        </RowWrapper>
        <RowWrapper>
          <Text>상품선택</Text>
          <MuiInput placeholder='선택된 상품이없습니다.' />
        </RowWrapper>
        <RowWrapper>
          <Text>평가</Text>
          <CustomRating
            name='rating'
            onChange={handleRatingOnChange}
            value={ratingValue}
            precision={0.5}
            size='large'
            className='rating'
          />
        </RowWrapper>
        <RowWrapper>
          <Text>제목</Text>
          <MuiInput
            inputProps={{ minLength: 5, maxLength: 100 }}
            placeholder='제목을 입력하세요.(최소 5자 이상)'
            value={titleValue}
            flag={titleRexge?.isError}
            helperText={titleRexge?.message}
            onChange={handleTitleOnChange}
          />
        </RowWrapper>
        <Title text='내용' />
        <Editor editorValue={editorValue} setEditorValue={handleOnChange} imgOnChange={handleImgOnChange} />
        <ButtonWrapper>
          <Button text='초기화' width='50%' type='button' backgroundColor='#a1a1a1' onClick={handleClickReset} />
          <Button text='등록' width='50%' type='submit' />
        </ButtonWrapper>
      </form>
    </Wrapper>
  );
};

const RowWrapper = styled.div`
  display: flex;
  height: 40px;
  margin: 5px 0;
`;
const Text = styled.div`
  width: 150px;
  ${flexStyleGroup('flex-start', 'center')}
  font-weight:500;
  font-size: 20px;
`;

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

export default InsertPage;
