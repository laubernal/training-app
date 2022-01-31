import { CategoryDto } from './CategoryDto';
import { SetDto } from './SetDto';

export class ExerciseDto {
  constructor(public category: CategoryDto, public exerciseName: string, public sets: SetDto[]) {}
}
