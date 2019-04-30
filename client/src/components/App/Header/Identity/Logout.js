import React from 'react';
import styled from 'styled-components';
import { firebase } from '../../../../firebase';

const Logout = () => {
  const signout = () => firebase.auth().signOut();

  const LogoutLink = styled.div(({ theme }) => {
    const { colors, space } = theme;
    return `
      cursor: pointer;  
      display: grid;
      align-items: center;
      padding: ${space.sm} ${space.md};
      
      &:hover {
        color: ${colors.blue[2]};
      }
    `;
  });

  return (
    <LogoutLink role="button" onClick={signout}>
      Logout
    </LogoutLink>
  );
};

export default Logout;
