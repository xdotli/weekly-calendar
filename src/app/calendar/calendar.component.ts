import { Component, OnInit } from '@angular/core';
import { DateService } from '../date.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  weekDates: string[] = [];

  constructor(private dateService: DateService) {}

  ngOnInit(): void {
    this.updateWeekDates();
  }

  updateWeekDates(): void {
    this.weekDates = this.dateService.getWeekDates(this.dateService.currentStartDate);
  }

  nextWeek(): void {
    this.dateService.getNextWeekStartDate();
    this.updateWeekDates();
  }

  previousWeek(): void {
    this.dateService.getPreviousWeekStartDate();
    this.updateWeekDates();
  }

  goToToday(): void {
    this.dateService.goToToday();
    this.updateWeekDates();
  }
}
