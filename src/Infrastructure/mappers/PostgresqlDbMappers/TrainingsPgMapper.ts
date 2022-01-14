import { Exercise } from '../../../Domain/entities/Exercise';
import { Serie } from '../../../Domain/entities/Serie';
import { Training } from '../../../Domain/entities/Training';
import { TrainingPgModel } from '../../dataModel/PostgresqlDbModels/TrainingPgModel';
import { IMapper } from '../IMapper';

export class TrainingsPgMapper implements IMapper<TrainingPgModel, Training> {
  public toDomain(training: TrainingPgModel): Training {
    const exercises = training.exercises.map((exerciseMap: any) => {
      const series = exerciseMap.series.map((serie: any) => {
        return new Serie(serie.reps, serie.weight, serie.seriesCount);
      });
      return new Exercise(exerciseMap.exerciseName, series);
    });

    return new Training(training.id, training.date, training.title, exercises);
  }

  public toData(training: Training): TrainingPgModel {
    const exercises = training.exercises.map((exerciseMap: any) => {
      const series = exerciseMap.series.map((serie: any) => {
        return { reps: serie.reps, weight: serie.weight, seriesCount: serie.seriesCount };
      });
      return { exerciseName: exerciseMap.exerciseName, series };
    });

    return {
      id: training.id,
      date: training.date,
      title: training.title,
      exercises,
    };
  }
}
