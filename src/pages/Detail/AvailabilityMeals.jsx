import React from 'react';
import styled from 'styled-components';
import { faUtensils, faGift, faMotorcycle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { tab, mobile } from 'styles/theme';

function AvailabilityMeals({ content }) {
  const availabilityData = [
    {
      ida: 1,
      name: '매장식사',
      icone: faUtensils,
    },
    {
      ida: 2,
      name: '포장',
      icone: faGift,
    },
    {
      ida: 3,
      name: '배달',
      icone: faMotorcycle,
    },
  ];
  return (
    <Contain>
      {availabilityData.map(({ ida, name, icone }) => {
        return (
          <Wrapper key={ida} availability={content?.includes(name)}>
            <FontAwesomeIcon icon={icone} className='availabilityIcon' />
            <Content availability={content?.includes(name)}>{name}</Content>
          </Wrapper>
        );
      })}
    </Contain>
  );
}

export default AvailabilityMeals;

const Contain = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-bottom: 3rem;
  margin-right: 10rem;
  ${tab} {
    margin-right: 6rem;
  }
  ${mobile} {
    margin-right: 2rem;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  & .availabilityIcon {
    margin-bottom: 2rem;
    font-size: 1.5rem;
    color: ${({ theme, availability }) => {
      return availability ? theme.colors.brandColor : theme.colors.lightGray;
    }};
    ${tab} {
      font-size: 1.2rem;
    }
    ${mobile} {
      font-size: 1rem;
    }
  }
`;

const Content = styled.div`
  color: ${({ theme, availability }) => {
    return availability ? theme.colors.brandColor : theme.colors.lightGray;
  }};
  font-weight: 600;
  ${tab} {
    font-size: 0.8rem;
  }
  ${mobile} {
    font-size: 0.6rem;
  }
`;
