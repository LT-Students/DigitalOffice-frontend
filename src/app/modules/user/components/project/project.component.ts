import { Component, OnInit, Input } from '@angular/core';

import { IProject } from '../../../../interfaces/project.interface';

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
