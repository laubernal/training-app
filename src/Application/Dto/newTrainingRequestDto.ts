import { Category } from '../../Domain/entities/Category';
import { Exercise } from '../../Domain/entities/Exercise';
import { Set } from '../../Domain/entities/Set';

export class NewTrainingRequestDto {
  constructor(
    public date: string,
    public title: string,
    public note: string,
    public exercise: Exercise[],
    public categoryName: Category,
    public exerciseName: string,
    public sets: Set[]
  ) {}
}
