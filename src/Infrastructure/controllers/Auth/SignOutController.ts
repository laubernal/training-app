import { Request, Response } from 'express';
import { Controller, get } from './decorators';

@Controller()
export class SignOutController {
  @get('/signout')
  public signOut(req: Request, res: Response): void {
    try {
      console.log('inside signout controller');

      req.session = null;
      res.status(200).send('You are logged out');
    } catch (err: any) {
      console.log(err);
      res.send({
        msg: 'Error occurred',
        error: err.message,
      });
    }
  }
}
