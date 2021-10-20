export interface ITraining {
    id: string,
    date: string,
    exercises: {
        exerciseName: string,
        series: {
            reps: number,
            weight: number,
            seriesCount: number
        }
    }
}