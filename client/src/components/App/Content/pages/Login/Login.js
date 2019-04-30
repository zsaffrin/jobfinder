import React from 'react';
import { Redirect } from '@reach/router';
import styled from 'styled-components';
import { useFirebaseAuth } from '../../../../../utils/authUtils';

import LoadingPage from '../../../../shared/LoadingPage';
import ContentBox from './ContentBox';
import LoginOptionList from './LoginOptionList';

const Login = () => {
  const { initialising, isAuthed } = useFirebaseAuth();

  if (initialising) return <LoadingPage />;
  if (isAuthed) return <Redirect from="/login" to="/" />;

  const LoginPage = styled.div`
    display: grid;
    align-items: center;
    justify-items: center;
    height: 100%;
  `;

  return (
    <LoginPage>
      <ContentBox>
        <p>Oh, hey!</p>
        <p>
          This app remembers listings you&apos;ve viewed, listed, applied to,
          etc. To do that, it needs to know who you are.
        </p>
        <p>Please log in using one of the methods below</p>
        <LoginOptionList />
      </ContentBox>
    </LoginPage>
  );
};

export default Login;
