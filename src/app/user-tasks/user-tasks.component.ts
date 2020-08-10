import { Component, Input, OnInit, } from '@angular/core';
/*import {IProject} from '../models/project.model';*/

@Component({
  selector: 'do-user-tasks',
  templateUrl: './user-tasks.component.html',
  styleUrls: ['./user-tasks.component.scss']
})
export class UserTasksComponent implements OnInit {
  @Input() projects: Array<IProject>;
  constructor() {}
  ngOnInit() {}

}
export interface IProject{}
