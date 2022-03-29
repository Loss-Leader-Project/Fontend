import MuiButton from 'Components/MuiButton';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import styled from 'styled-components';
import { gray, lightDark, mobile, tab } from 'styles/theme';
import { getData } from 'utils/api';

const RecommandBox = () => {
  const [randomIndex, setRandomIndex] = useState(0);

  const location = useLocation();

  const [menuList, setMenuList] = useState('');

  useEffect(() => {
    getData('/data/menuList.json').then(res => {
      setMenuList(res.data.menuList);
    });
  }, []);

  useEffect(() => {
    const fetchMenu = async () => {
      await setRandomIndex(Math.floor(Math.random() * menuList.length));
      await setMenu(menuList[randomIndex]);
    };
    fetchMenu();
  }, [location, randomIndex, menuList]);

  const [menu, setMenu] = useState('');

  const RandomRequest = async () => {
    await setRandomIndex(Math.floor(Math.random() * menuList.length));
    await setMenu(menuList[randomIndex]);
  };

  return (
    <Container>
      <TextBox>
        <div>오늘은 </div>
        <div>이거 어때요?</div>
      </TextBox>
      <RandomText>
        <span>{menu}</span>
      </RandomText>
      <RecommandButton>
        <MuiButton content='추천받기' onClick={RandomRequest} />
      </RecommandButton>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
  align-items: center;
  height: 150px;
  background-color: #eee;

  ${mobile} {
    flex-flow: column wrap;
    height: 300px;
  }
`;

const TextBox = styled.div`
  font-size: 2rem;
  display: flex;
  flex-flow: column wrap;
  gap: 0.625rem;
  color: ${lightDark};

  ${mobile} {
    flex-flow: row wrap;
  }
`;

const RandomText = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  height: 70px;
  font-weight: 600;
  color: ${lightDark};
  border-bottom: 2px solid ${gray};
`;

const RecommandButton = styled('div')`
  width: 15%;

  Button {
    font-size: 1.2rem;
  }

  ${tab} {
    Button {
      font-size: 1rem;
    }
  }

  ${mobile} {
    width: 50%;
    Button {
      font-size: 1.2rem;
    }
  }
`;

export default RecommandBox;
