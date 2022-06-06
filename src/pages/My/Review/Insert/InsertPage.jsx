import MuiInput from 'Components/MuiInput';
import React, { useCallback, useState } from 'react';
import { Rating } from '@mui/material';
import styled from 'styled-components';
import { brandColor, gray, mobile } from 'styles/theme';
import Editor from 'Components/Editor';
import Button from 'Components/Button';
import validation from 'utils/validation';
import { flexStyleGroup } from 'styles/theme';
import Title from 'Components/Title';
import { ApiRq } from 'utils/apiConfig';
import { myApiURL } from 'utils/apiUrl';
import { useHistory, useLocation } from 'react-router-dom';
import TokenCheck from 'utils/TokenCheck';

const TITLE_INIT_VALUE = '';
const RATING_INIT_VALUE = 3;
const EDITOR_INIT_VALUE = '';

const InsertPage = () => {
  const [editorValue, setEditorValue] = useState(EDITOR_INIT_VALUE);
  const [ratingValue, setRatingValue] = useState(RATING_INIT_VALUE);
  const [titleValue, setTitleValue] = useState(TITLE_INIT_VALUE);
  const [editorImgs, setEditorImgs] = useState([]);
  const [errors, setErrors] = useState({});
  const { state } = useLocation();
  const { orderNumber, storeId, productName } = state ?? {};
  const { titleRexge } = errors;
  const history = useHistory();
  const { emptyCheck } = validation;

  /**
   * 유저가 리뷰 등록 버튼으로 이동을 안하고 url를 직접 요청으로 페이지 접근 시
   * 방지하는 코드
   */
  if (emptyCheck(orderNumber) || emptyCheck(storeId) || emptyCheck(productName)) history.replace('/');

  const handleOnChange = useCallback(text => setEditorValue(text), []);
  const handleRatingOnChange = useCallback(({ target: { value } }) => setRatingValue(Number(value)), []);
  const handleTitleOnChange = useCallback(({ target: { value } }) => setTitleValue(value), []);
  const handleImgOnChange = useCallback(imgUrl => setEditorImgs(prev => [...prev, imgUrl]), []);

  const fetchImgRemove = useCallback(
    async imageName => {
      try {
        await ApiRq('delete', `${myApiURL.DELETE_REVIEW_IMG}?imageIdentify=${imageName}`, null, null);
        const newImages = editorImgs.filter(item => item !== imageName);
        setEditorImgs(newImages);
      } catch (error) {
        alert('이미지 삭제에 실패했습니다.');
      }
    },
    [editorImgs]
  );
  /**
   * 내용에 없는 이미지 url 삭제
   */
  const handleImgRemove = useCallback(imageName => () => fetchImgRemove(imageName), [fetchImgRemove]);

  const statusCheck = (status, targetStatus, path, callback) => {
    if (status === targetStatus) callback(path);
  };

  const handleStatus = useCallback(
    ({ status, message }) => {
      alert(message);
      statusCheck(status, 419, '/login', path => history.replace(path));
    },
    [history]
  );

  const handleSubmit = async e => {
    e.preventDefault();
    setErrors({});

    const title = titleValue;
    const star = ratingValue;

    const imgFormatConvert = image => ({ imageIdentify: image });

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
      const imageIdentifyList = editorImgs.map(item => imgFormatConvert(item));

      const payload = {
        star,
        title,
        content,
        imageIdentifyList,
      };

      const { data } = await TokenCheck(async Authorization => {
        const headers = { Authorization };
        const end_point = `${myApiURL.POST_CREATE_REVIEW}?orderNumber=${orderNumber}&storeId=${storeId}`;
        return ApiRq('post', end_point, null, payload, headers);
      });

      // alert(data);
      // if (/리뷰 작성 완료/gi.test(data)) return history.replace('/my/review');
      return history.replace('/my/review');
    } catch (error) {
      if ('data' in error) {
        const { code, message } = error.data;
        handleStatus({ status: code, message });
        return;
      }
      setErrors(error);
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
          <Text>상품명</Text>
          <MuiInput value={productName} disabled />
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
        <Title text='등록한 이미지' />
        <ReviewWrapper>
          {editorImgs.map(image => (
            <ReviewImgWrapper>
              <ReviewImg
                className='reviewImg'
                src={`${process.env.REACT_APP_REVIEW_IMG_URL}/${image}`}
                alt='reviewImg'
                onClick={handleImgRemove(image)}
              />
            </ReviewImgWrapper>
          ))}
        </ReviewWrapper>
        <Title text='내용' />
        <Editor
          editorImgs={editorImgs}
          editorValue={editorValue}
          setEditorValue={handleOnChange}
          imgOnChange={handleImgOnChange}
        />
        <ButtonWrapper>
          <Button text='초기화' width='50%' type='button' backgroundColor='#a1a1a1' onClick={handleClickReset} />
          <Button text='등록' width='50%' type='submit' />
        </ButtonWrapper>
      </form>
    </Wrapper>
  );
};

const ReviewWrapper = styled.div`
  margin-bottom: 0.9375rem;
`;

const ReviewImgWrapper = styled.div`
  height: 200px;
  display: inline-block;
  width: calc(20% - 0.625rem);
  margin: 0 0.3125rem;
  cursor: pointer;
  transition: opacity 0.25s ease-in;
  &:hover {
    opacity: 0.8;
  }

  ${mobile} {
    width: calc(33.3% - 0.625rem);
    height: 130px;
  }
`;
const ReviewImg = styled.img`
  width: 100%;
  height: 100%;
`;

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
  .MuiFormControl-root {
    height: 40px !important;
  }
  .MuiOutlinedInput-root {
    height: 100%;
  }
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
