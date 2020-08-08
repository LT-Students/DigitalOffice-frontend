import { Component, Input, OnInit, } from '@angular/core';
import { ITask } from '../models/task.model';

@Component({
  selector: 'do-user-notes',
  templateUrl: './do-user-notes.component.html',
  styleUrls: ['./do-user-notes.component.scss']
})
export class DoUserNotesComponent implements OnInit {

  @Input() task: ITask;

  /*projects = ["Kojima is a Genius", "Меркурий"];
  tasks = ["текст задачи 1 проекта Kojima", "текст задачи 2 проекта Меркурий"];*/

  /*ngFor project in projects
    ngFor task in project.tasks
1) выводит инфу о всех проектах
2) инфа о всех задачах*/

  constructor() {}
  ngOnInit() {}

}
