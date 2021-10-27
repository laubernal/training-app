import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { DATE_FORMAT } from '../../constants';

export class TrainingDate {
  public static generate(date: string): string {
    dayjs.extend(customParseFormat);
    const trainingDate = dayjs(date, DATE_FORMAT, true);
    console.log(date);
    console.log(trainingDate);

    console.log(trainingDate.isValid());

    if (trainingDate.isValid() === false) {
      throw new Error('Invalid date');
    }

    return trainingDate.format(DATE_FORMAT);
  }

  private validateDate() {}
}
