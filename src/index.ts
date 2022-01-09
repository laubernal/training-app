require('dotenv').config();
import express, { Application } from 'express';
import cookieSession from 'cookie-session';

import { AppRouter } from './Infrastructure/controllers/AppRouter';

import './Infrastructure/controllers/Auth';
import './Infrastructure/controllers/Trainings';

import { UserPgRepository } from './Infrastructure/repositories/PostgresqlDB/UserPgRepository';

const app: Application = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieSession({ name: 'session', signed: false }));
app.use(AppRouter.getInstance());

const userPgRepository = new UserPgRepository();
// userPgRepository.getOneBy('us_id', '1');
// userPgRepository.save('us_id, us_first_name, us_last_name, us_email, us_password', [
//   '4',
//   'Demonitu',
//   'Demonil',
//   'demonitu@gmail.com',
//   'password',
// ]);

try {
  app.listen(port, () => {
    console.log(`Connected successfully to port ${port}`);
  });
} catch (error: any) {
  console.error(`Error occured: ${error.message}`);
}
