import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {
  currentStartDate: Date;
  today: Date;

  constructor() {
    this.today = new Date();
    this.today.setHours(0, 0, 0, 0); // Ensure no time component
    this.currentStartDate = this.getStartOfWeek(this.today);
  }

  getStartOfWeek(date: Date): Date {
    const day = date.getDay();
    const diff = date.getDate() - day; // Adjust when day is not Sunday
    return new Date(date.setDate(diff));
  }

  getWeekDates(startDate: Date): string[] {
    const weekDates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      weekDates.push(this.formatDate(date));
    }
    return weekDates;
  }

  formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }

  getNextWeekStartDate(): Date {
    const nextWeek = new Date(this.currentStartDate);
    nextWeek.setDate(this.currentStartDate.getDate() + 7);
    this.currentStartDate = this.getStartOfWeek(nextWeek);
    return this.currentStartDate;
  }

  getPreviousWeekStartDate(): Date {
    const previousWeek = new Date(this.currentStartDate);
    previousWeek.setDate(this.currentStartDate.getDate() - 7);
    if (previousWeek < this.today) {
      this.currentStartDate = this.getStartOfWeek(this.today);
    } else {
      this.currentStartDate = this.getStartOfWeek(previousWeek);
    }
    return this.currentStartDate;
  }

  goToToday(): Date {
    this.currentStartDate = this.getStartOfWeek(this.today);
    return this.currentStartDate;
  }
}
