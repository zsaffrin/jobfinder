import React from 'react';
import styled from 'styled-components';

const Title = () => {
  const StyledDiv = styled.div(({ theme }) => {
    const { space } = theme;
    return `
      padding: ${space.sm} ${space.md};
    `;
  });
  const StyledHeading = styled.h1`
    font-size: 1.25em;
    text-transform: uppercase;
  `;

  return (
    <StyledDiv>
      <StyledHeading>Jobfinder</StyledHeading>
    </StyledDiv>
  );
};

export default Title;
