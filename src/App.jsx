import React from 'react';
import Routers from './Routers';
import GlobalStyle from './styles/globalStyle';
import styled, {
  ThemeProvider as StyledThemeProvider,
} from 'styled-components';
import { ThemeProvider as MaterialThemeProvider } from '@mui/material/styles';

import theme from './styles/theme';
import materialThme from './styles/muiTheme';

let Layout = styled('main')`
  max-width: 1200px;
  margin: 0 auto;
`;

function App() {
  return (
    <React.StrictMode>
      <MaterialThemeProvider theme={materialThme}>
        <StyledThemeProvider theme={theme}>
          <GlobalStyle />
          <Layout>
            <Routers />
          </Layout>
        </StyledThemeProvider>
      </MaterialThemeProvider>
    </React.StrictMode>
  );
}

export default App;
