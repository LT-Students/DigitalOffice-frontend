import { Component, Input, OnInit } from '@angular/core';

/* import { ITask } from '../../../../../core/interfaces/task.interface'; */
import { WorkTime } from '../../../../../data/models/work-time';

@Component({
  selector: 'do-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
  isInput = false;
  @Input() workTime: WorkTime;
  hours = 0;
  minutes = 0;
  @Input() delete: any;

  constructor() {}

  changeInput() {
    console.log('input');
    this.isInput = !this.isInput;
  }

  changeTitle(value: string) {
    this.workTime.title = value;
  }

  ngOnInit() {
    this.hours = Math.floor(this.workTime.minutes / 60);
    this.minutes = this.workTime.minutes % 60;
  }
}
