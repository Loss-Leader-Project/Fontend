import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faGitSquare } from '@fortawesome/free-brands-svg-icons';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { tab, mobile, lightGray, brandColor } from 'styles/theme';

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
        {footerData.footerMenu?.map(menu => {
          return (
            <Menues to={`/${menu.name === '팀원소개' ? 'teamInfo' : ''}`} key={menu.id}>
              {menu.name}
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
  background-color: ${lightGray};
`;

const Menues = styled(Link)`
  margin: 0 20px 0 0;
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: 900;
  &:hover {
    color: ${brandColor};
  }
`;

const ContentsWrapper = styled.div`
  margin: 4rem 0 2rem 0;
`;

const ProjectTitle = styled.p`
  padding: 0 0 1.2rem 0;
  font-size: 1.2rem;
`;

const CompanyContents = styled.p`
  padding: 0 0 1rem 0;
  line-height: 1.3rem;
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
  }
  &:hover {
    color: ${brandColor};
  }
`;
