import React from 'react';
import styled from 'styled-components';
import { useFirebaseAuth } from '../../../../utils/authUtils';

import LoadingIcon from '../../../shared/LoadingIcon';
import Login from './Login';
import Logout from './Logout';

const Identity = () => {
  const { initialising, isAuthed } = useFirebaseAuth();

  const StyledDiv = styled.div`
    grid-column: -1;
    display: grid;
  `;

  const LoadingDiv = styled(StyledDiv)(({ theme }) => {
    const { space } = theme;
    return `
      align-items: center;
      padding: ${space.sm} ${space.md};
    `;
  });

  if (initialising) {
    return (
      <LoadingDiv>
        <LoadingIcon />
      </LoadingDiv>
    );
  }

  return <StyledDiv>{isAuthed ? <Logout /> : <Login />}</StyledDiv>;
};

export default Identity;
