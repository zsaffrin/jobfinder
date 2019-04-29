import React from 'react';
import { Router } from '@reach/router';
import styled from 'styled-components';

import Home from './pages/Home';
import Login from './pages/Login/Login';
import Jobs from './pages/Jobs/Jobs';

const Content = () => {
  const ContentSection = styled.main(({ theme }) => {
    const { space } = theme;
    return `
      display: grid;
      padding: ${space.md};
    `;
  });

  return (
    <ContentSection>
      <Router>
        <Login path="/login" />
        <Jobs path="/jobs" />
        <Home path="/" default />
      </Router>
    </ContentSection>
  );
};

export default Content;
