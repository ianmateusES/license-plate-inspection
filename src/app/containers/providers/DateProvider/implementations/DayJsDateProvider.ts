import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { IDateProvider } from '../models/IDateProvider';

dayjs.extend(utc);

class DayjsDateProvider implements IDateProvider {
  public checkIsBefore(start_date: Date, end_date: Date): boolean {
    const start = dayjs(start_date);
    const end = dayjs(end_date);
    return start.isBefore(end);
  }

  public checkIsAfter(start_date: Date, end_date: Date): boolean {
    const start = dayjs(start_date);
    const end = dayjs(end_date);
    return start.isAfter(end);
  }

  public compareInDays(start_date: Date, end_date: Date): number {
    const start = dayjs(start_date);
    const end = dayjs(end_date);
    return end.diff(start, 'days');
  }

  public dateNow(): Date {
    return dayjs().subtract(3, 'hour').toDate();
  }

  public dateNowFormat(): Date {
    const dateNow = dayjs().subtract(3, 'hour');
    return dateNow.toDate();
  }

  public addDays(days: number, reference_date?: Date): Date {
    let date = reference_date ? dayjs(reference_date) : dayjs();
    date = date.subtract(3, 'hour');
    return date.add(days, 'day').toDate();
  }

  public addDaysFormat(days: number, reference_date?: Date): Date {
    let date = reference_date ? dayjs(reference_date) : dayjs();
    date = date.subtract(3, 'hour');
    return date.add(days, 'day').toDate();
  }

  public addHours(hours: number, reference_date?: Date): Date {
    let date = reference_date ? dayjs(reference_date) : dayjs();
    date = date.subtract(3, 'hour');
    return date.add(hours, 'hour').toDate();
  }

  public subHours(hours: number, reference_date?: Date): Date {
    const date = reference_date ? dayjs(reference_date) : dayjs();
    return date.subtract(3, 'hour').subtract(hours, 'hour').toDate();
  }

  public convertToUTC(date: Date): string {
    return dayjs(date).subtract(3, 'hour').utc().local().format();
  }

  public compareInHours(start_date: Date, end_date: Date): number {
    return dayjs(this.convertToUTC(end_date))
      .subtract(3, 'hour')
      .diff(this.convertToUTC(start_date), 'hours');
  }
}

export { DayjsDateProvider };
