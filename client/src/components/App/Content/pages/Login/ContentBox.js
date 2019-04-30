import React from 'react';
import styled from 'styled-components';

const ContentBox = ({ children }) => {
  const Box = styled.div`
    text-align: center;
    width: 24em;
  `;

  return <Box>{children}</Box>;
};

export default ContentBox;
