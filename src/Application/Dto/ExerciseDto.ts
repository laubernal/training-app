import { CategoryDto } from './CategoryDto';
import { SetDto } from './SetDto';

export class ExerciseDto {
  constructor(public categoryName: string, public exerciseName: string, public sets: SetDto[]) {}
}
