import React from 'react';
import Routers from './Routers';
import GlobalStyle from './styles/globalStyle';
import styled, { ThemeProvider } from 'styled-components';
import theme from './styles/theme';
import { RenderAfterNavermapsLoaded } from 'react-naver-maps';

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
        <RenderAfterNavermapsLoaded
          ncpClientId={'nh1l9cbip1'}
          error={<p>Maps Load Error</p>}
          loading={<p>Maps Loading...</p>}
        >
          <GlobalStyle />
          <Layout>
            <Routers />
          </Layout>
        </RenderAfterNavermapsLoaded>
      </ThemeProvider>
    </React.StrictMode>
  );
}

export default App;
