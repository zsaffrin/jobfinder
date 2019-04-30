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
  return [...(await getCodepenJobs()), ...(await getWorkingNomadsJobs())];
}

export async function getCodepenJobs() {
  const jobData = await fetchFromUrl('https://codepen.io/jobs.json');
  const formattedJobs = jobData.jobs.map(job => ({
    company: job.company_name,
    description: job.description,
    location: job.location,
    remote: job.remote,
    source: 'codepen',
    tags: [],
    title: job.title,
    uniqueId: job.hashid,
    url: job.url,
    originalRecord: job
  }));
  return formattedJobs;
}

export async function getWorkingNomadsJobs() {
  const jobData = await fetchFromUrl(
    'https://www.workingnomads.co/api/exposed_jobs/'
  );
  const formattedJobs = jobData.jobs.map(job => ({
    company: job.company_name,
    description: job.description,
    location: job.location,
    remote: null,
    source: 'workingNomads',
    tags: job.tags.split(','),
    title: job.title,
    uniqueId: job.pub_date,
    url: job.url,
    originalRecord: job
  }));
  return formattedJobs;
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
