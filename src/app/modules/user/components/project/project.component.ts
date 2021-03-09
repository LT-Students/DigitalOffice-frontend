import { Component, OnInit, Input } from '@angular/core';

import { Project } from '../../../../data/models/project';

@Component({
  selector: 'do-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit {
  @Input() project: Project;

  constructor() {}

  ngOnInit() {}
}
