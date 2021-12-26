import { Exercise } from '../../Domain/entities/Exercise';
import { Serie } from '../../Domain/entities/Serie';

export class NewTrainingRequestDto {
  constructor(public date: string, public title: string, public exercise: Exercise[], public exerciseName: string, public series: Serie[]) {}
}
