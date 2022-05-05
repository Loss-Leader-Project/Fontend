import React from 'react';
import Routers from './Routers';
import GlobalStyle from './styles/globalStyle';
import styled, { ThemeProvider } from 'styled-components';
import theme from './styles/theme';
import { Provider } from 'react-redux';
import store from 'modules/Store';

const Layout = styled('main')`
  max-width: 75rem;
  min-width: 23.4375rem;
  margin: 0 auto;
  min-width: 23.4375rem;
`;

function App() {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Layout>
            <Routers />
          </Layout>
        </ThemeProvider>
      </Provider>
    </React.StrictMode>
  );
}

export default App;
