import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { IProject } from '../../../../interfaces/project.interface';
import { AttendanceService } from '../attendance/attendance.service';

@Component({
  selector: 'do-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit {
  @Input() project: IProject;

  constructor() {}

  ngOnInit() {}
}
