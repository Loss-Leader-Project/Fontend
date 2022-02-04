import React from 'react';
import Routers from './Routers';
import GlobalStyle from './styles/globalStyle';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';

function App() {
  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
      </ThemeProvider>
      <Routers />
    </React.StrictMode>
  );
}

export default App;
