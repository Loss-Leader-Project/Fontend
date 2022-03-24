import { Rating } from '@mui/material';
import React from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';

const MainCard = props => {
  const history = useHistory();

  const moveDetail = id => {
    history.push(`/product/${id}`);
  };

  return (
    <CardWrapper
      onClick={() => {
        moveDetail(props.id);
      }}
    >
      {props.name === 'hotplace' && (
        <div>
          <div>
            <CardImg src={`${process.env.REACT_APP_STORE_IMG_URL}/${props.imgUrl}`} alt='cardImg' />
          </div>
          <div>
            <CardTitle>
              [{props.location}] {props.storeName}
            </CardTitle>
            <CardContent name={props.name}>{props.couponContent}제공</CardContent>
          </div>
        </div>
      )}
      {props.name === 'bestreview' && (
        <div>
          <div>
            <CardImg src={`${process.env.REACT_APP_REVIEW_IMG_URL}/${props.reviewImage}`} alt='cardImg' />
          </div>
          <div>
            <CardContent name={props.name}>{props.reviewContent}</CardContent>
            <CardContent>
              <CustomRating
                name='rating'
                defaultValue={0}
                value={props.star || null}
                precision={0.5}
                size='small'
                readOnly
              />
              <CardSpan>{props.userName}</CardSpan>
            </CardContent>
          </div>
        </div>
      )}
    </CardWrapper>
  );
};

const CardWrapper = styled.div`
  width: 33.333%;
  padding: 0.3rem;
  margin-bottom: 1.563rem;
  flex-direction: column;
  display: flex;
  gap: 0.313rem;

  ${({ theme }) => theme.media.tab} {
    &:nth-child(n) {
      padding: 0 0.35rem;
    }
  }

  @media screen and (max-width: 700px) {
    width: 100%;
  }

  ${({ theme }) => theme.media.mobile} {
    &:nth-child(n) {
      padding: 0;
    }
  }
`;

const CardImg = styled.img`
  width: 100%;
  object-fit: cover;
  object-position: center;
  overflow: hidden;
`;

const CardTitle = styled.h6`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 1.1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gray};
`;

const CardSpan = styled.span`
  margin-top: 0.1875rem;
  margin-left: 0.625rem;
  color: ${({ theme }) => theme.colors.gray};
`;

const CardContent = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0.3125rem 0;
  font-size: 1rem;
  font-weight: 600;

  color: ${({ name, theme }) => (name === 'hotplace' ? theme.colors.brandColor : theme.colors.lightDark)};
  display: flex;
  align-items: center;
`;

const CustomRating = styled(Rating)`
  &&& {
    color: ${({ theme }) => theme.colors.brandColor};
  }
`;

export default MainCard;
