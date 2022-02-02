import { ExerciseDto } from './ExerciseDto';

export class NewTrainingDto {
  constructor(
    public date: string,
    public title: string,
    public note: string,
    public exercise: ExerciseDto[],
    public userId: string
  ) {}
}
