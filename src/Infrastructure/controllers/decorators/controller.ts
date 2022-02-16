import 'reflect-metadata';
import { NextFunction, Request, RequestHandler, Response } from 'express';

import { AppRouter } from '../AppRouter';
import { MetadataKeys, Methods } from '../enums';

function bodyValidators(keys: string): RequestHandler {
  return function (req: Request, res: Response, next: NextFunction) {
    console.log('inside bodyValidators', req.body);
    console.log('keys', keys);

    if (!req.body) {
      res.status(422).send('Invalid request');
      return;
    }

    for (let key of keys) {
      console.log('for loop', req.body[key]);

      if (!req.body[key]) {
        res.status(422).send(`Missing ${key} property`);
        return;
      }
    }

    next();
  };
}

export function Controller() {
  console.log('inside controller');

  return function (target: Function) {
    const router = AppRouter.getInstance();

    for (const key of Object.getOwnPropertyNames(target.prototype)) {
      const routeHandler = target.prototype[key].bind(target.prototype);
      const path = Reflect.getMetadata(MetadataKeys.path, target.prototype, key);
      const method: Methods = Reflect.getMetadata(MetadataKeys.method, target.prototype, key);
      const middlewares = Reflect.getMetadata(MetadataKeys.middleware, target.prototype, key) || [];
      const requiredBodyProps = Reflect.getMetadata(MetadataKeys.validator, target.prototype, key);

      console.log('before validator');

      const validator = bodyValidators(requiredBodyProps);

      if (path) {
        router[method](`${path}`, ...middlewares, validator, routeHandler);
      }
    }
  };
}
