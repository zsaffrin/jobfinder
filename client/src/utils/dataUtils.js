import { useEffect, useState } from 'react';
import { db } from '../firebase';

export async function fetchFromUrl(url) {
  return await fetch(url)
    .then(async res => {
      return await res.json();
    })
    .catch(err => {
      throw new Error(err);
    });
}

export async function getAllJobs() {
  return fetchFromUrl('http://localhost:4382/api/jobs');
}

export async function saveNewSystemJob(job) {
  console.info('Saving new system job...');
  const collectionRef = db.collection('jobs');
  const docRef = await collectionRef.add(job).catch(err => console.error(err));
  console.info(`Document added with ID ${docRef.id}`);
  return docRef;
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
