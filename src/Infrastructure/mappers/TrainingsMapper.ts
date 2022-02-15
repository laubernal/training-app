import { Exercise } from '../../Domain/entities/Exercise';
import { Set } from '../../Domain/entities/Set';
import { Training } from '../../Domain/entities/Training';
import { TrainingModel } from '../dataModel/TrainingModel';
import { IMapper } from './IMapper';

export class TrainingsMapper implements IMapper<TrainingModel, Training> {
  public rawDataToModel(item: any): any {}

  public toDomain(training: TrainingModel): Training {
    const exercises = training.exercises.map((exerciseMap: any) => {
      const sets = exerciseMap.series.map((set: any) => {
        return new Set(set.id, set.reps, set.weight, set.seriesCount);
      });
      return new Exercise(exerciseMap.id, exerciseMap.categoryName, exerciseMap.exerciseName, sets);
    });

    return new Training(
      training.id,
      training.date,
      training.title,
      training.note,
      exercises,
      training.userId
    );
  }

  public toData(training: Training): TrainingModel {
    const exercises = training.exercises.map((exerciseMap: any) => {
      const series = exerciseMap.series.map((set: any) => {
        return { reps: set.reps, weight: set.weight, seriesCount: set.seriesCount };
      });
      return {
        categoryName: exerciseMap.categoryName,
        exerciseName: exerciseMap.exerciseName,
        series,
      };
    });

    return {
      id: training.id,
      date: training.date,
      title: training.title,
      note: training.note,
      exercises,
      userId: training.userId,
    };
  }
}
