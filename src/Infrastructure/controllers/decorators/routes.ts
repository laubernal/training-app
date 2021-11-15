import 'reflect-metadata';
import { MetadataKeys, Methods } from '../enums';

function routeBinder(method: Methods.get | Methods.post) {
  return function (path: string) {
    return function (target: any, key: string, desc: PropertyDescriptor) {
      console.log('inside route binder');

      Reflect.defineMetadata(MetadataKeys.path, path, target, key);
      Reflect.defineMetadata(MetadataKeys.method, method, target, key);
    };
  };
}

export const get = routeBinder(Methods.get);
export const post = routeBinder(Methods.post);
