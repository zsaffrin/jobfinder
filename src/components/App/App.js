import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import 'firebase/auth';

import { jobfinderTheme } from '../../themes';

import Header from './Header/Header';

const App = () => {
  const AppLayout = styled.div`
    display: grid;
    grid-template-rows: auto 1fr;
    min-height: 100vh;
  `;
  return (
    <ThemeProvider theme={jobfinderTheme}>
      <AppLayout>
        <Header />
        <div>New jobfinder app</div>
      </AppLayout>
    </ThemeProvider>
  );
};

export default App;
