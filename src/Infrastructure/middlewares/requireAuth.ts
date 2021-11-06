import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload {
  id: string;
  email: string;
}

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session || !req.session.jwt) {
    throw new Error('Invalid session');
  }

  try {
    const payload = jwt.verify(req.session.jwt, process.env.TOKEN_KEY!) as UserPayload;

    const userJwt = jwt.sign(
      {
        id: payload.id,
        email: payload.email,
      },
      process.env.TOKEN_KEY!
    );

    req.session = {
      jwt: userJwt,
    };

    next();
  } catch (err: any) {
    throw new Error('User not authorized');
  }
};
