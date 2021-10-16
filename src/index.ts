import express, { Application } from 'express';
import cookieSession from 'cookie-session';

import { user } from './Infrastructure/routes/userController';

const app: Application = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieSession({ name: 'session', keys: ['askjhf'] }));
app.use(user);

try {
  app.listen(port, () => {
    console.log(`Connected successfully to port ${port}`);
  });
} catch (error: any) {
  console.error(`Error occured: ${error.message}`);
}
