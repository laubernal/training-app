import { Training } from "../../Domain/entities/Training";
import { ITraining } from "../../Domain/interfaces/ITraining";
import { IMapper } from "./IMapper";

export class TrainingsMapper implements IMapper<ITraining, Training> {
    public toDomain(training: ITraining): Training {}

    public toData(training: Training): ITraining {}
}