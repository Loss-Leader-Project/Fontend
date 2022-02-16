import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';

const MainSlider = () => {
  return (
    <SliderContainer>
      <Slider {...sliderSettings}>
        {BannerData.map((item, index) => {
          return <img key={index} src={item.bannerURL} alt={`banner${index}`} />;
        })}
      </Slider>
    </SliderContainer>
  );
};

export default MainSlider;

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

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  autoplay: true,
  autoplaySpeed: 3000,
};

const BannerData = [
  { bannerURL: `${process.env.PUBLIC_URL}/images/banner1.png` },
  { bannerURL: `${process.env.PUBLIC_URL}/images/banner2.png` },
  { bannerURL: `${process.env.PUBLIC_URL}/images/banner3.png` },
];

const SliderContainer = styled.div`
  max-height: 28.125rem;
  margin: 1.875rem 0;
`;
