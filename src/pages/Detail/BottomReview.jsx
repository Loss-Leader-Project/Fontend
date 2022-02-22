import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { Rating } from '@mui/material';
import Carousel from './Carousel';
import { tab, mobile, brandColor, lightGray } from 'styles/theme';

function BottomReview({ review }) {
  const { star, userId, reviewUpdateDate, reviewImage, reviewContent } = review;

  return (
    <BottomWrapper>
      <TopInfo>
        <FontAwesomeIcon icon={faUserCircle} className='icon' />
        <Info>
          <div>{userId}</div>
          <RatingWrapper>
            <Rating
              name='rating'
              defaultValue={0}
              value={star || null}
              precision={0.5}
              size='small'
              className='rating'
              readOnly
            />
            <RatingNumberDate fontSize='0.8rem'>{reviewUpdateDate}</RatingNumberDate>
          </RatingWrapper>
        </Info>
      </TopInfo>
      <Content>{reviewContent}</Content>
      <Carousel {...{ reviewImage }} altText='리뷰이미지' autoPlay={false} />
    </BottomWrapper>
  );
}

export default BottomReview;

const BottomWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5rem 0 10rem 0;
  ${tab} {
    margin: 5rem 0 5rem 0;
  }
  ${mobile} {
    margin: 5rem 0 3rem 0;
  }
  & .icon {
    font-size: 2.8rem;
    color: #add8e6;
  }
`;

const TopInfo = styled.header`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const Info = styled.main`
  margin: 0 0 0 1rem;
`;

const RatingWrapper = styled.div`
  display: flex;
  margin-top: 0.5rem;
  align-items: center;
  & .rating {
    color: ${brandColor};
  }
`;

const Content = styled.p`
  line-height: 1.8rem;
`;

const RatingNumberDate = styled.p`
  font-size: ${({ fontSize }) => fontSize};
  margin: 0 0 0 0.5rem;
  color: ${lightGray};
`;
