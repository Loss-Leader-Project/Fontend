import { createTheme } from '@mui/material';

const materialTheme = createTheme({
  colors: {
    gray: '#707070',
    brandColor: '#FF422E',
    lightGray: '#B9B9B9',
    lightDark: '#4A4646',
  },
  palette: {
    gray: {
      main: '#707070',
      contrastText: '#fff',
    },
    lightGray: {
      main: '#B9B9B9',
      contrastText: '#fff',
    },
    brandColor: {
      main: '#FF422E',
      contrastText: '#fff',
    },
    lightDark: {
      main: '#4A4646',
      contrastText: '#fff',
    },
  },
});

export default materialTheme;
