export class TrainingDate {
  public static generate(date: string): string {
    if (this.validateDate(date) === false) {
      throw new Error('Invalid date');
    }

    return date;
  }

  private static validateDate(date: string): boolean {
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const datepattern = /^(\d{2})([\./])(\d{2})([\./])(\d{4})$/;

    if (!datepattern.test(date)) {
      return false;
    }

    const splitDate = date.split('/');

    const day = parseInt(splitDate[0]);
    const month = parseInt(splitDate[1]);
    const year = parseInt(splitDate[2]);

    if (this.isLeapYear(year)) {
      daysInMonth[2] = 29;
    }
    if (day === 0 || day > daysInMonth[month - 1]) {
      return false;
    }
    if (month <= 0 || month > 12) {
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
