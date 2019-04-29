import { useEffect, useState } from 'react';
import { db } from '../firebase';

export async function loadJobs() {
  return await fetch('http://localhost:4382/api/jobs')
    .then(async res => {
      return await res.json();
    })
    .catch(err => {
      throw new Error(err);
    });
}

export function useSystemJobs() {
  const [jobs, setJobs] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(false);

  useEffect(() => {
    setLoadingJobs(true);
    const systemjobsRef = db.collection('jobs');

    const unsubscribe = systemjobsRef.onSnapshot(data => {
      let sysjobsRecords = [];
      data.forEach(doc => sysjobsRecords.push(doc.data()));
      setJobs(sysjobsRecords);
      setLoadingJobs(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return { loadingJobs, jobs };
}

export function useUserJobs(userid = 0) {
  const [jobs, setJobs] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(false);

  useEffect(() => {
    setLoadingJobs(true);
    const userjobsRef = db.collection('userjobs').where('uid', '==', userid);

    const unsubscribe = userjobsRef.onSnapshot(data => {
      let userjobsRecords = [];
      data.forEach(doc => userjobsRecords.push(doc.data()));
      if (userjobsRecords.length > 0) {
        setJobs(userjobsRecords[0].jobs);
      }
      setLoadingJobs(false);
    });

    return () => {
      unsubscribe();
    };
  }, [userid]);

  return { loadingJobs, jobs };
}
