import { v4 as uuidv4 } from 'uuid';

export class Id {
  public static generate(): string {
    const uniqueId = uuidv4();
    // console.log(uniqueId);

    return uniqueId;
  }
}
