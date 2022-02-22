import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';

function Carousel({ reviewImage, altText, autoPlay }) {
  //목데랑 alt 부분 자동으로 넘겨지는부분 인ㅈ로 받기
  const sliderSettings = {
    className: 'center',
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: autoPlay, //이부분 바꿈
    autoplaySpeed: 3000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <SliderContainer>
      <Slider {...sliderSettings}>
        {reviewImage?.map(({ id, image }) => {
          return <img key={id} src={image} alt={altText} />;
        })}
      </Slider>
    </SliderContainer>
  );
}

export default Carousel;

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'block',
        left: '3px',
        height: '40px',
        width: '40px',
        zIndex: '2',
      }}
      onClick={onClick}
    />
  );
}

function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'block',
        right: '3px',
        height: '40px',
        width: '40px',
        zIndex: '2',
      }}
      onClick={onClick}
    />
  );
}

const SliderContainer = styled.div`
  max-height: 28.125rem;
  margin: 1.875rem 0;
`;
