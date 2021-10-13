import { randomBytes, scryptSync } from 'crypto';

import { VO } from './VO';
import { ObjectDefinition } from '../../Infrastructure/repositories/FsRepository';

const upperCaseRegex = /^[A-Z]$/;
const lowerCaseRegex = /^[a-z]$/;
const numberRegex = /^[0-9]$/;
const symbolRegex = /^[-#!$@%^&*()_+|~=`{}\[\]:";'<>?,.\/ ]$/;

export class Password extends VO {
  constructor(private password: string) {
    super();
    this.validate();
    this.password = this.hashPassword(this.password);
  }

  public get value(): string {
    return this.password;
  }

  private validate(): void {
    this.password = this.password.trim();
    this.isEmpty(this.password);

    if (this.password.length < 8) {
      throw new Error('Password length must be greater than 8');
    }
  }

  private hashPassword(password: string): string {
    const salt = randomBytes(8).toString('hex');
    const buf = scryptSync(password, salt, 64);

    return `${buf.toString('hex')}.${salt}`;
  }

  private countCharacters(password: string): Object {
    let count: ObjectDefinition = {};
    password.split('').forEach((character: string) => {
      let currentValue = count[character];

      if (currentValue) {
        count[character] += 1;
      } else {
        count[character] = 1;
      }
    });
    return count;
  }

  private analyzePassword(password: string): Object {
    let characterMap: ObjectDefinition = this.countCharacters(password);
    let analysis = {
      length: characterMap,
      uniqueCharacters: Object.keys(characterMap).length,
      upperCaseCount: 0,
      lowerCaseCount: 0,
      numberCount: 0,
      symbolCount: 0
    };

    Object.keys(characterMap).forEach((character: string) =>{
      if (upperCaseRegex.test(character)) {
        analysis.upperCaseCount += characterMap[character];
      }
    });
    
    return analysis;
  }
}
