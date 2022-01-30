import { Exercise } from '../../Domain/entities/Exercise';
import { Set } from '../../Domain/entities/Set';
import { Training } from '../../Domain/entities/Training';
import { TrainingModel } from '../dataModel/TrainingModel';
import { IMapper } from './IMapper';

export class TrainingsMapper implements IMapper<TrainingModel, Training> {
  public rawDataToModel(item: any): any {}

  public toDomain(training: TrainingModel): Training {
    const exercises = training.exercises.map((exerciseMap: any) => {
      const series = exerciseMap.series.map((serie: any) => {
        return new Set(serie.reps, serie.weight, serie.seriesCount);
      });
      return new Exercise(exerciseMap.categoryName, exerciseMap.exerciseName, series);
    });

    return new Training(training.id, training.date, training.title, training.note, exercises);
  }

  public toData(training: Training): TrainingModel {
    const exercises = training.exercises.map((exerciseMap: any) => {
      const series = exerciseMap.series.map((serie: any) => {
        return { reps: serie.reps, weight: serie.weight, seriesCount: serie.seriesCount };
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
    };
  }
}
