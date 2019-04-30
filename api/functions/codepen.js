import axios from 'axios';

async function getCodepenJobData() {
  const { data } = await axios
    .get('https://codepen.io/jobs.json')
    .catch(err => console.error(err));
  return data;
}

async function getCodepenJobs() {
  const jobData = await getCodepenJobData();
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

export { getCodepenJobs };
