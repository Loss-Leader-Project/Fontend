import { css } from 'styled-components';
const Size = {
  pc: '75em', // 1200px
  tab: '56.25em', // 900px
  mobile: '31.25em', // 500px
};

const theme = {
  colors: {
    0: '#707070',
    1: '#FF422E',
    2: '#B9B9B9',
    3: '#4A4646',
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
