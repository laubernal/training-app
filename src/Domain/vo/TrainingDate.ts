import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { DATE_FORMAT } from '../../constants';

export class TrainingDate {
  public static generate(date: string): string {
    dayjs.extend(customParseFormat);
    const trainingDate = dayjs(date, DATE_FORMAT);
    console.log(date);
    console.log(trainingDate.get('month'));

    console.log(trainingDate.isValid());
    console.log('my validation', this.validateDate(trainingDate.toString()));

    // if (trainingDate.isValid() === false) {
    //   throw new Error('Invalid date');
    // }

    return trainingDate.format(DATE_FORMAT);
  }

  private static validateDate(date: string): boolean {
    const monthlyDays = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    console.log(date);

    const splitDate = date.split('/');

    const dateDay = parseInt(splitDate[0]);
    const dateMonth = parseInt(splitDate[1]);
    const dateYear = parseInt(splitDate[3]);
    console.log('days', dateDay);

    if (this.isLeapYear(dateYear)) {
      monthlyDays[2] = 29;
    }
    if (dateDay === 0 || dateDay > monthlyDays[dateMonth]) {
      return false;
    }
    if (dateMonth <= 0 || dateMonth > 12) {
      return false;
    }

    return true;
  }

  private static isLeapYear(year: number): boolean {
    if (year % 4 === 0) {
      if (year % 100 === 0) {
        if (year % 400 === 0) {
          return true;
        } else return false;
      } else return true;
    }
    return false;
  }
}
