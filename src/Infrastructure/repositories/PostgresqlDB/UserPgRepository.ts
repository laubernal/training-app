import { PostgreRepository } from './PostgreRepository';

export class UserPgRepository extends PostgreRepository {
  constructor() {
    super('users');
  }
}
