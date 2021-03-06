import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faGitSquare } from '@fortawesome/free-brands-svg-icons';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { tab, mobile, brandColor, lightDark } from 'styles/theme';

export default function Footer() {
  const [footerData, setFooterData] = useState([]);

  useEffect(() => {
    fetch('/data/footerData.json')
      .then(res => res.json())
      .then(data => setFooterData(data))
      .catch(console.log);
  }, []);

  const fontawsomeIconImage = [faGithub, faGitSquare, faCopy];

  return (
    <Contain>
      <div>
        {footerData.footerMenu?.map(({ name, id }) => {
          return (
            <Menues to={`/${name === '팀원소개' ? 'teamsInfo' : 'projectInfo'}`} key={id}>
              {name}
            </Menues>
          );
        })}
      </div>
      {footerData.footerSubMenu?.map(menu => {
        return (
          <ContentsWrapper key={menu.id}>
            <ProjectTitle>{menu.title}</ProjectTitle>
            {menu.contentList.map(contentList => {
              return <CompanyContents key={contentList.id}>{contentList.content}</CompanyContents>;
            })}
          </ContentsWrapper>
        );
      })}
      <IconWrapper>
        {footerData.footerIconLink?.map(icon => {
          return (
            <Icons key={icon.id} onClick={() => (window.location.href = icon.link)}>
              <FontAwesomeIcon className='icon' icon={fontawsomeIconImage[icon.id - 1]} />
              {icon.name}
            </Icons>
          );
        })}
      </IconWrapper>
    </Contain>
  );
}

const Contain = styled.div`
  width: 100%;
  margin: 0 auto;
  margin-top: 10rem;
  padding: 2rem 6rem;
  background-color: #e9ecef;
`;

const Menues = styled(Link)`
  margin: 0 1rem 0 0;
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: 900;
  color: ${lightDark};
  &:hover {
    color: ${brandColor};
  }
  ${tab} {
    font-size: 1rem;
  }
  ${mobile} {
    padding: 0.8rem;
  }
`;

const ContentsWrapper = styled.div`
  margin: 4rem 0 2rem 0;
  ${tab} {
    margin: 2rem 0 1rem 0;
  }
`;

const ProjectTitle = styled.p`
  padding: 0 0 1.2rem 0;
  font-size: 1.2rem;
  color: ${lightDark};
  ${tab} {
    font-size: 1rem;
  }
  ${mobile} {
    padding: 0.8rem;
  }
`;

const CompanyContents = styled.p`
  line-height: 1.5rem;
  color: ${lightDark};
`;

const IconWrapper = styled.div`
  display: flex;
`;

const Icons = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 1rem;
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
