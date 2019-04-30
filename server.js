import express from 'express';
import cors from 'cors';
import apiRoutes from './api/routes/apiRoutes';

const app = express();

app.use(cors());
app.use('/api', apiRoutes);

const port = 4382;
app.listen(port, () =>
  console.info(`JobFinder backend running on port ${port}`)
);
