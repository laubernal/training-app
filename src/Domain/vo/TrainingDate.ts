import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

export class TrainingDate {
  public static generate(date: string): string {
    dayjs.extend(customParseFormat);
    const trainingDate = dayjs(date, 'DD-MM-YYYY', true);
    console.log(date);
    console.log(trainingDate);

    console.log(trainingDate.isValid());

    if (trainingDate.isValid() === false) {
      throw new Error('Invalid date');
    }

    return trainingDate.format('DD-MM-YYYY');
  }
}
