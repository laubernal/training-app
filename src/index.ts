require('dotenv').config();
import express, { Application } from 'express';
import cookieSession from 'cookie-session';

import { user } from './Infrastructure/routes/userController';
import { training } from './Infrastructure/routes/trainingController';
import { requireAuth } from './Infrastructure/middlewares/requireAuth';

const app: Application = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieSession({ name: 'session', signed: false }));
app.use(user);
app.use(requireAuth);
app.use(training);

try {
  app.listen(port, () => {
    console.log(`Connected successfully to port ${port}`);
  });
} catch (error: any) {
  console.error(`Error occured: ${error.message}`);
}
