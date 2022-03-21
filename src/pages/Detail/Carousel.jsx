import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';
import { changeImageUrl } from './changeImageUrl';

function Carousel({ imageIdentifyList, altText, autoPlay }) {
  const sliderSettings = {
    className: 'center',
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: autoPlay,
    autoplaySpeed: 3000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
  const imagesChange = changeImageUrl(imageIdentifyList, '리뷰');
  return (
    <SliderContainer>
      <Slider {...sliderSettings}>
        {imagesChange.map(({ id, image }) => {
          return <img key={id} src={image} alt={altText} />;
        })}
      </Slider>
    </SliderContainer>
  );
}
//
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
