import {Component, Input, OnInit} from '@angular/core';
import {ITask} from "../models/task.model";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  @Input() task: ITask;


  constructor() { }

  ngOnInit() {
  }

}
