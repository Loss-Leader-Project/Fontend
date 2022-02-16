import React from 'react';
import MainList from './MainList';
import MainSlider from './MainSlider';
import RecommandBox from './RecommandBox';

const Main = () => {
  return (
    <div>
      <MainSlider />
      <MainList name='hotplace' title='핫플레이스' />
      <RecommandBox />
      <MainList name='bestreview' title='베스트 후기' />
    </div>
  );
};

export default Main;
