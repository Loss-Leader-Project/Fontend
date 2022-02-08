import React from 'react';
import Routers from './Routers';
import GlobalStyle from './styles/globalStyle';
import styled, { ThemeProvider } from 'styled-components';
import theme from './styles/theme';

let Layout = styled('main')`
  max-width: 1200px;
  margin: 0 auto;
`;

function App() {
  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Layout>
          <Routers />
        </Layout>
      </ThemeProvider>
    </React.StrictMode>
  );
}

export default App;
