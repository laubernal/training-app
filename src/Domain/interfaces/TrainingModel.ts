export interface TrainingModel {
  id: string;
  date: string;
  title: string;
  exercises: {
    exerciseName: string;
    series: {
      reps: number;
      weight: number;
      seriesCount: number;
    }[];
  }[];
}
