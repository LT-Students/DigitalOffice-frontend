import { Component, Input, OnInit } from '@angular/core';

import { Task } from '@data/models/task';
import { ProjectStore } from '@data/store/project.store';

@Component({
  selector: 'do-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
  isInput = false;
  @Input() task: Task;
  hours = 0;
  minutes = 0;
  @Input() delete: any;

  constructor(private projectStore: ProjectStore) {}

  changeInput() {
    console.log('input');
    this.isInput = !this.isInput;
  }

  changeTitle(value: string) {
    this.task.title = value;
  }

  deleteTask(projectId: string, taskId: string): Function {
    return () => {
      this.projectStore.deleteTaskFromProject(projectId, taskId);
    };
  }

  ngOnInit() {
    this.hours = Math.floor(this.task.minutes / 60);
    this.minutes = this.task.minutes % 60;
  }
}
