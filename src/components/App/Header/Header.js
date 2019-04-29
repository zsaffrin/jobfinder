import React from 'react';
import styled from 'styled-components';

import Title from './Title';
import PageNav from './PageNav/PageNav';
import Identity from './Identity/Identity';

const Header = () => {
  const StyledHeader = styled.header(({ theme }) => {
    const { color } = theme;
    return `
      background: ${color.primary};
      color: ${color.white};
      display: grid;
      grid-template-columns: auto auto 1fr auto;
    `;
  });

  return (
    <StyledHeader>
      <Title />
      <PageNav />
      <Identity />
    </StyledHeader>
  );
};

export default Header;
