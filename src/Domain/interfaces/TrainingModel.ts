export interface TrainingModel {
  id: string;
  date: Date;
  exercises: {
    exerciseName: string;
    series: {
      reps: number;
      weight: number;
      seriesCount: number;
    }[];
  }[];
}
