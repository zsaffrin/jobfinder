import React, { useState } from 'react';
import { useSystemJobs, getAllJobs } from '../../../../../utils/dataUtils';
import LoadingIcon from '../../../../shared/LoadingIcon';

const LiveJobs = ({ user }) => {
  const [isLoadingLiveJobs, setIsLoadingLiveJobs] = useState(false);
  const [liveJobs, setLiveJobs] = useState([]);

  const { jobs: systemJobs } = useSystemJobs();

  const refreshLiveJobs = () => {
    setIsLoadingLiveJobs(true);
    getAllJobs()
      .then(res => {
        setLiveJobs(res);
        setIsLoadingLiveJobs(false);
      })
      .catch(err => {
        throw new Error(err);
      });
  };

  const isJobNew = job =>
    systemJobs.filter(sysJob => sysJob.uniqueId === job.uniqueId).length === 0;

  const newJobs = liveJobs.filter(job => isJobNew(job));
  const recognizedJobs = liveJobs.filter(job => !isJobNew(job));

  return (
    <div>
      {isLoadingLiveJobs ? (
        <div>
          <LoadingIcon />
        </div>
      ) : (
        <div>
          {liveJobs.length > 0
            ? `${liveJobs.length} jobs loaded. ${
                recognizedJobs.length
              } recognized. ${newJobs.length} new jobs found`
            : 'No live jobs loaded'}
        </div>
      )}

      <div>
        <button onClick={refreshLiveJobs}>Refresh Live Jobs</button>
      </div>
    </div>
  );
};

export default LiveJobs;
