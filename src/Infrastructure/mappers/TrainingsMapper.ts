import { Exercise } from '../../Domain/entities/Exercise';
import { Serie } from '../../Domain/entities/Serie';
import { Training } from '../../Domain/entities/Training';
import { ITraining } from '../../Domain/interfaces/ITraining';
import { IMapper } from './IMapper';

export class TrainingsMapper implements IMapper<ITraining, Training> {
  public toDomain(training: ITraining): Training {
    return new Training(
      training.id,
      training.date,
      new Exercise(
        training.exercises.exerciseName,
        new Serie(
          training.exercises.series.reps,
          training.exercises.series.weight,
          training.exercises.series.seriesCount
        )
      )
    );
  }

  public toData(training: Training): ITraining {
    return {
      id: training.id,
      date: training.date,
      exercises: {
        exerciseName: training.exercises.exerciseName,
        series: {
          reps: training.exercises.series.reps,
          weight: training.exercises.series.weight,
          seriesCount: training.exercises.series.seriesCount,
        },
      },
    };
  }
}
