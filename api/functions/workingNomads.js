import axios from 'axios';

async function getWorkingNomadsJobData() {
  const { data } = await axios
    .get('https://www.workingnomads.co/api/exposed_jobs/')
    .catch(err => console.error(err));
  return data;
}

async function getWorkingNomadsJobs() {
  const jobData = await getWorkingNomadsJobData();
  const formattedJobs = jobData.map(job => ({
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

export { getWorkingNomadsJobs };
