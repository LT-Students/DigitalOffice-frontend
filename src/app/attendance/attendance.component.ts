import { Component, OnInit } from '@angular/core';
import { IDailyHoursData } from '../gradient-graphics/gradient-graphics.component';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {
  public projectsData = [
    {name: 'Ромашки', description: 'testdesc'},
    {name: 'Рога и копыта', description: 'testdesc'},
  ]

  public dailyHoursData: IDailyHoursData[] = [
    {
      day: 'fr',
      month: 'june',
      hours: 2,
      minutes: 2
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
