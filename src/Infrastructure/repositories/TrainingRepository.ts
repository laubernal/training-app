import { TRAININGS_JSON } from "../../constants";
import { Training } from "../../Domain/entities/Training";
import { ITraining } from "../../Domain/interfaces/ITraining";
import { TrainingsMapper } from "../mappers/TrainingsMapper";
import { FsRepository } from "./FsRepository";
import { JsonFileReader } from "./JsonFileReader";

export class TrainingRepository extends FsRepository<ITraining, Training> {
    protected mapper = new TrainingsMapper();
    
    constructor() {
        super(new JsonFileReader(TRAININGS_JSON));
    }
}