import { Injectable } from '@angular/core';
import { startOfWeek, addDays, format, addWeeks, subWeeks } from 'date-fns';

@Injectable({
  providedIn: 'root'
})
export class DateService {
  currentStartDate: Date;

  constructor() {
    this.currentStartDate = startOfWeek(new Date(), { weekStartsOn: 0 }); // Start of the current week (Sunday)
  }

  getWeekDates(startDate: Date): string[] {
    return Array.from({ length: 7 }).map((_, i) =>
      format(addDays(startDate, i), 'EEEE, MMMM do, yyyy')
    );
  }

  getNextWeekStartDate(): Date {
    this.currentStartDate = addWeeks(this.currentStartDate, 1);
    return this.currentStartDate;
  }

  getPreviousWeekStartDate(): Date {
    this.currentStartDate = subWeeks(this.currentStartDate, 1);
    return this.currentStartDate;
  }
}
