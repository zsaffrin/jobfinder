import React, { useState } from 'react';
import {
  useUserJobs,
  getAllJobs,
  saveNewSystemJob,
  saveNewUserJob
} from '../../../../../utils/dataUtils';
import LoadingIcon from '../../../../shared/LoadingIcon';

const LiveJobs = ({ user }) => {
  const [isLoadingLiveJobs, setIsLoadingLiveJobs] = useState(false);
  const [liveJobs, setLiveJobs] = useState([]);

  const { jobs: userJobs } = useUserJobs(user.uid);

  const refreshLiveJobs = () => {
    setIsLoadingLiveJobs(true);
    getAllJobs()
      .then(res => {
        const jobs = processJobs(res);
        setLiveJobs(jobs);
        setIsLoadingLiveJobs(false);
      })
      .catch(err => {
        throw new Error(err);
      });
  };

  const saveSystemJobs = () => {
    saveNewSystemJob(liveJobs[0]);
  };

  const isJobNew = job =>
    userJobs.filter(userJob => userJob.uniqueId === job.uniqueId).length === 0;

  const processJobs = jobs =>
    jobs.reduce((acc, job) => {
      if (isJobNew(job)) {
        job.isNew = isJobNew(job);
        job.firstSeen = new Date();
      }

      return [job, ...acc];
    }, []);

  const newJobs = liveJobs.filter(job => job.isNew);
  const recognizedJobs = liveJobs.filter(job => !job.isNew);

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
        {liveJobs.length > 0 && (
          <button onClick={saveSystemJobs}>Save System Jobs</button>
        )}
      </div>
    </div>
  );
};

export default LiveJobs;
