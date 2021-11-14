import 'reflect-metadata';
import { AppRouter } from '../AppRouter';
import { MetadataKeys } from '../MetadataKeys';
import { Methods } from '../Methods';

export function Controller() {
  return function (target: Function) {
    console.log('inside controller decorator');

    const router = AppRouter.getInstance();

    for (let key of Object.getOwnPropertyNames(target.prototype)) {
      const routeHandler = target.prototype[key];
      const path = Reflect.getMetadata(MetadataKeys.path, target.prototype, key);
      console.log(path);

      const method: Methods = Reflect.getMetadata(MetadataKeys.method, target.prototype, key);

      if (path) {
        router[method](`${path}`, routeHandler);
      }
    }
  };
}
