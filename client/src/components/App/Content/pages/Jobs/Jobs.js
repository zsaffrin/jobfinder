import React from 'react';
import styled from 'styled-components';
import { useFirebaseAuth } from '../../../../../utils/authUtils';

import LiveJobs from './LiveJobs';

const Jobs = () => {
  const { user } = useFirebaseAuth();

  const JobsPage = styled.div(({ theme }) => {
    const { space } = theme;
    return `
      display: grid;
      grid-gap: ${space.lg};
    `;
  });

  return (
    <JobsPage>
      <LiveJobs user={user} />
    </JobsPage>
  );
};

export default Jobs;
