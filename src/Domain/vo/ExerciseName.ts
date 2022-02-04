import { VO } from './VO';

export class ExerciseName extends VO {
  constructor(private exerciseName: string) {
    super();
    this.validate();
  }

  private validate() {
    this.exerciseName = this.exerciseName.trim();
    this.isEmpty(this.exerciseName);
  }

  public get value(): string {
    return this.exerciseName;
  }
}
