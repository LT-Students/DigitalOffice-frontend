import { Component, Input, OnInit, } from '@angular/core';
import { IProject } from '../models/project.model';
import { ITask } from '../models/task.model';

@Component({
  selector: 'do-user-tasks',
  templateUrl: './user-tasks.component.html',
  styleUrls: ['./user-tasks.component.scss']
})
export class UserTasksComponent implements OnInit {
  @Input() projects: Array<IProject> = [];
  
  constructor() {}
  
  ngOnInit() {
    var project = new Project();
    project.name = 'Some project';
    project.tasks = [
        {
          time: { hours: 4, minutes: 0},
          name: 'Some task',
          description: 'Some description',
          createdAt: new Date(2017, 1)
        }
      ];

    this.projects.push(
      project
    )
  }

}
export class Project implements IProject{
  name: string;
  tasks: Array<ITask>;
}


