import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

export class TrainingDate {
  public static generate(date: string): string {
    dayjs.extend(customParseFormat);

    return dayjs(date, 'DD-MM-YYYY').format('DD-MM-YYYY');
  }
}
