import { Component, Input, OnInit } from '@angular/core';
import { Time } from '@angular/common';
import { ITimePeriod } from '../interfaces/time-period.interface';

@Component({
  selector: 'app-add-hours',
  templateUrl: './add-hours.component.html',
  styleUrls: ['./add-hours.component.scss']
})
export class AddHoursComponent implements OnInit {

  @Input() timePeriodSelected: ITimePeriod;

  public recommendedHours: Time;

  public user = {
    projects: ['Ромашка', 'Рога и копыта']
  }

  constructor() { }

  ngOnInit() {
    if (!this.timePeriodSelected.to) {
      this.recommendedHours = {hours: 8, minutes:0}
    }
  }

}
