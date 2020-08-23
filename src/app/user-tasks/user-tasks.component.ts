import { Component, Input, OnInit, } from '@angular/core';
import { IProject } from '../models/project.model';


@Component({
  selector: 'do-user-tasks',
  templateUrl: './user-tasks.component.html',
  styleUrls: ['./user-tasks.component.scss']
})
export class UserTasksComponent implements OnInit {
  @Input() projects: Array<IProject> = [
    {
    name: 'Proj',
    tasks: [
      {
        time: {hours: 2, minutes: 3},
        name: 'Developing',
        description: 'desc1',
        createdAt: new Date()
      },
      {
        time: {hours: 2, minutes: 3},
        name: 'Developing',
        description: 'desc1',
        createdAt: new Date()
      },
    ]
  },
    {
      name: 'Proj',
      tasks: [
        {
          time: {hours: 2, minutes: 3},
          name: 'Developing',
          description: 'desc1',
          createdAt: new Date()
        }
      ]
    }
    ];
  isOrderedByProject: boolean = false;
  isOrderedByHours: boolean = false;
  startPeriod: Date;
  endPeriod: Date;
  tasksCount: number = 0;
  constructor() {}

  ngOnInit() {
    const now = new Date();
    this.startPeriod = new Date();
    this.startPeriod.setDate(now.getDate() - 3);
    this.endPeriod = new Date();
    this.endPeriod.setDate(now.getDate() + 3);
    if (this.projects.length !== 0){
      this.tasksCount = this.projects.map((p) => p.tasks).reduce((all, tasks) => all.concat(tasks)).length;
    }
  }
  sortByProject(): void {
    this.isOrderedByProject = !this.isOrderedByProject;
  }
  sortByHours(): void {
    this.isOrderedByHours = !this.isOrderedByHours;
  }
}

