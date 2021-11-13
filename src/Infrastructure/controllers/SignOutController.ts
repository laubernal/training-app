import { Request, Response } from 'express';
import { get } from '../controllers/decorators/routes';

// @Controller
export class SignOutController {
  @get('/signout')
  public signOut(req: Request, res: Response) {
    try {
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
