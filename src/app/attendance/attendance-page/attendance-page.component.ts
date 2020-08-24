import { Component, OnInit } from '@angular/core';
import {IDailyHoursData} from "../../gradient-graphics/gradient-graphics.component";

@Component({
  selector: 'app-attendance-page',
  templateUrl: './attendance-page.component.html',
  styleUrls: ['./attendance-page.component.scss']
})
export class AttendancePageComponent implements OnInit {
  public user = {
    firstName: 'Ия'
  }

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
