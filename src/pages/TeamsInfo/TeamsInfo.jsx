import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import Title from 'Components/Title';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { brandColor, lightDark, mobile } from 'styles/theme';

function TeamsInfo() {
  const [info, setInfo] = useState({});
  const { data } = info;

  useEffect(() => {
    fetch('/data/team.json')
      .then(response => response.json())
      .then(data => setInfo(data));
  }, []);

  return (
    <Container>
      <Title text='팀원소개' />
      <Wrapper>
        {data?.map(({ id, name, postion, imgUrl, githublink }) => (
          <ItemWrapper key={id}>
            <ImgWrapper>
              <img src={imgUrl} alt={imgUrl} />
            </ImgWrapper>
            <InfoWrapper>
              <Postion className={postion}>{postion}</Postion>
              <Name>👨‍💻{name}</Name>
              <Icon>
                <a href={githublink} target='_blank' rel='noreferrer'>
                  <FontAwesomeIcon className='icon' icon={faGithub} />
                </a>
              </Icon>
            </InfoWrapper>
          </ItemWrapper>
        ))}
      </Wrapper>
    </Container>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const ItemWrapper = styled.div`
  width: 25%;
  padding: 0.625rem;

  ${mobile} {
    padding: 0.3125rem;
    width: 33.3%;
  }

  :hover {
    img {
      transform: scale(1.05);
    }
  }
`;

const Name = styled.div`
  :hover {
    color: #1375c4;
  }
`;

const Icon = styled.div`
  cursor: pointer;
  & .icon {
    font-size: 2rem;
    margin-bottom: 0.5rem;
    color: ${lightDark};
    &:hover {
      color: ${brandColor};
    }
  }
  &:hover {
    color: ${brandColor};
  }
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
`;

const ImgWrapper = styled.div`
  overflow: hidden;
  border-radius: 0.9375rem;

  img {
    transition: transform 0.25s ease-in;
    width: 100%;
    height: 100%;
  }
`;
const Postion = styled.div`
  font-family: 'Black Han Sans', sans-serif;
  margin-top: 0.625rem;
  font-size: 1.25rem;
  font-weight: 400;
  &.FE {
    color: #2393f3;
  }
  &.BE {
    color: #fa3952;
  }
`;

const Container = styled.div`
  padding: 0 0.625rem;
`;

export default TeamsInfo;
