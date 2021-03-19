import { Component, Input, OnInit } from '@angular/core';
import { Task } from '@data/models/task';
import { ProjectStore } from '@data/store/project.store';

@Component({
  selector: 'do-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
  isEdited = false;
  @Input() task: Task;
  hours = 0;
  minutes = 0;

  constructor(private projectStore: ProjectStore) {}

  toggleInput() {
    this.isEdited = !this.isEdited;
  }

  changeDescription(
    projectId: string,
    taskId: string,
    newDescription: string
  ): Function {
    return () => {
      this.projectStore.changeDescriptionInProject(
        projectId,
        taskId,
        newDescription
      );
      this.toggleInput();
    };
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
