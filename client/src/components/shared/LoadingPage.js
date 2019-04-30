import React from 'react';
import styled from 'styled-components';

import LoadingIcon from './LoadingIcon';

const LoadingPage = () => {
  const FullPage = styled.div`
    display: grid;
    font-size: 42px;
    align-items: center;
    justify-items: center;
    height: 100%;
  `;

  return (
    <FullPage>
      <LoadingIcon />
    </FullPage>
  );
};

export default LoadingPage;
