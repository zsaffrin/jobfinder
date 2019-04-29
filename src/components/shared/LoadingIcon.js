import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

const LoadingIcon = () => {
  const StyledIcon = styled(FontAwesomeIcon)`
    animation: loadingIconSpin infinite 1s linear;

    @keyframes loadingIconSpin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  `;

  return <StyledIcon icon={['fas', 'spinner']} />;
};

export default LoadingIcon;
