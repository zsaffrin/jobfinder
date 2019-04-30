import React from 'react';
import styled from 'styled-components';
import { Link } from '@reach/router';

const PageNavLink = ({ title, url }) => {
  const NavLink = styled(Link)(({ theme }) => {
    const { colors, space } = theme;
    return `
      color: inherit;
      display: grid;
      align-items: center;
      padding: ${space.sm} ${space.md};
      text-decoration: none;
      &:hover {
        color: ${colors.blue[2]};
      }
    `;
  });

  return <NavLink to={url}>{title}</NavLink>;
};

export default PageNavLink;
