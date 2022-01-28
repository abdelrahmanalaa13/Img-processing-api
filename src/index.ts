import { Request, Response } from 'express';
import * as fs from 'fs';
import * as express from 'express';
import * as path from 'path';
import routes from './routes/index';

const port = 1313;
const app = express();

app.use('/api', routes);

app.get('/', (request: Request, res: Response): void => {
  res.status(200).send('Working!');
});

app.listen(port, (): void => {
  // make sure thumb folder exists
  const thumbPath = path.resolve(__dirname, '../assets/edited');

  if (!fs.existsSync(thumbPath)) {
    fs.mkdirSync(thumbPath);
  }

  console.log(`Running on port ${port}`);
});

export default app;
