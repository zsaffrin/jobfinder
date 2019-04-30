import { getCodepenJobs } from './codepen';
import { getWorkingNomadsJobs } from './workingNomads';

const sourceRegister = [
  {
    key: 'codepen',
    name: 'Codepen',
    fetcher: getCodepenJobs
  },
  {
    key: 'workingNomads',
    name: 'Working Nomads',
    fetcher: getWorkingNomadsJobs
  }
];

async function getAllJobs() {
  const allJobs = sourceRegister.reduce(async (acc, source) => {
    return await source
      .fetcher()
      .then(async jobs => [...(await acc), ...(await jobs)])
      .catch(err => console.error(err));
  }, []);

  return allJobs;
}

async function getJobsBySource(source) {
  return sourceRegister[source]
    ? await sourceRegister[source].fetcher()
    : await getAllJobs();
}

function compileSourceData(jobs) {
  return jobs.reduce((acc, job) => {
    acc[job.source] ? (acc[job.source] += 1) : (acc[job.source] = 1);
    return acc;
  }, {});
}

async function getOrganizedJobs() {
  return await getAllJobs().then(jobs => {
    const sources = compileSourceData(jobs);
    return { jobs, sources };
  });
}

export {
  getAllJobs,
  getOrganizedJobs,
  getJobsBySource,
  getCodepenJobs,
  getWorkingNomadsJobs
};
