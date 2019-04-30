import express from 'express';
import { getJobsBySource, getAllJobs } from '../functions';

const routes = express.Router();

routes.get('/jobs/:sourceid?', async (req, res) => {
  const jobs = req.params.sourceid
    ? await getJobsBySource(req.params.sourceid)
    : await getAllJobs();
  res.json(jobs);
});

export default routes;
