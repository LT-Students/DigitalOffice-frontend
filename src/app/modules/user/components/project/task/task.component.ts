import { Component, Input, OnInit } from '@angular/core';

import { ITask } from '../../../../../core/interfaces/task.interface';
import { WorkTime } from '../../../../../data/models/work-time';

@Component({
  selector: 'do-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
  @Input() workTime: WorkTime;
  hours = 0;
  minutes = 0;

  constructor() {}

  ngOnInit() {
    this.hours = Math.floor(this.workTime.minutes / 60);
    this.minutes = this.workTime.minutes % 60;
  }
}
