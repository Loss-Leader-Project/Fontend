import { css } from 'styled-components';
const Size = {
  pc: '1200px', // 1200px
  tab: '900px', // 900px
  mobile: '600px', // 600px
};

const theme = {
  colors: {
    gray: '#707070',
    brandColor: '#FF422E',
    lightGray: '#B9B9B9',
    lightDark: '#4A4646',
  },
  media: {
    pc: `@media screen and (max-width: ${Size.pc})`,
    tab: `@media screen and (max-width: ${Size.tab})`,
    mobile: `@media screen and (max-width: ${Size.mobile})`,
  },

  paddingStyleGroup: padding => {
    return css`
      padding: ${padding};
    `;
  },
  flexStyleGroup: (justify, align, direction) => {
    return css`
      display: flex;
      justify-content: ${justify};
      align-items: ${align};
      flex-direction: ${direction};
    `;
  },
};

export default theme;
