require('dotenv').config();
import express, { Application } from 'express';
import cookieSession from 'cookie-session';

import { AppRouter } from './Infrastructure/controllers/AppRouter';

import './Infrastructure/controllers/Auth';
import './Infrastructure/controllers/Trainings';

const app: Application = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieSession({ name: 'session', signed: false }));
app.use(AppRouter.getInstance());

try {
  app.listen(port, () => {
    console.log(`Connected successfully to port ${port}`);
  });
} catch (error: any) {
  console.error(`Error occured: ${error.message}`);
}
