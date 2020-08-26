import { Component, Input, OnInit } from '@angular/core';
import { Time } from '@angular/common';
import { ITimePeriod } from '../../../../interfaces/time-period.interface';
import { IUser } from '../../../../interfaces/user-response.interface';

@Component({
  selector: 'app-add-hours',
  templateUrl: './add-hours.component.html',
  styleUrls: ['./add-hours.component.scss']
})
export class AddHoursComponent implements OnInit {

  @Input() timePeriodSelected: ITimePeriod;
  @Input() userq: IUser;

  public recommendedTime: Time;

  public user = {
    projects: ['Ромашка', 'Рога и копыта']
  }

  constructor() { }

  ngOnInit() {
    if (!this.timePeriodSelected.to) {
      this.recommendedTime = {hours: 8, minutes:0}
    }
  }

}
