import React from 'react';
import Routers from './Routers';
import GlobalStyle from './styles/globalStyle';
import styled, { ThemeProvider } from 'styled-components';

import theme from './styles/theme';

const Layout = styled('main')`
  max-width: 75rem;
  min-width: 23.4375rem;
  margin: 0 auto;
  min-width: 23.4375rem;
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
