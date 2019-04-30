import React from 'react';
import styled from 'styled-components';

import PageNavLink from './PageNavLink';

const PageNav = () => {
  const PageNavLinks = styled.div`
    display: grid;
  `;

  return (
    <PageNavLinks>
      <PageNavLink url="/jobs" title="Jobs" />
    </PageNavLinks>
  );
};

export default PageNav;
