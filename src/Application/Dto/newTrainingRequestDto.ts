import { Exercise } from "../../Domain/entities/Exercise";

export class NewTrainingRequestDto {
  constructor(public date: string, public title: string, public exercise: Exercise[]) {}
}
