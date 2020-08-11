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
    project.name = 'Kojima is a genius';
    project.tasks = [
        {
          time: { hours: 4, minutes: 0},
          name: 'Фикс неправильного отображения строки “Коты” на дашборде',
          description: 'Распланировали сегодня спринт на 11 дней, дал задачи стажеру. Я просто решила написать длинный комментарий, чтобы посмотреть, как сломается система, потому что еще работаю на полставки тестировщиком. Му-ха-ха-ха!',
          createdAt: new Date(2020, 6)
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

