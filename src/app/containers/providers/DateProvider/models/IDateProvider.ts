interface IDateProvider {
  compareInHours(start_date: Date, end_date: Date): number;
  compareInDays(start_date: Date, end_date: Date): number;

  convertToUTC(date: Date): string;
  dateNow(): Date;
  dateNowFormat(): Date;

  addDays(days: number, reference_date?: Date): Date;
  addDaysFormat(days: number, reference_date?: Date): Date;
  addHours(hours: number, reference_date?: Date): Date;
  subHours(hours: number, reference_date?: Date): Date;

  checkIsBefore(start_date: Date, end_date: Date): boolean;
  checkIsAfter(start_date: Date, end_date: Date): boolean;
}

export { IDateProvider };
