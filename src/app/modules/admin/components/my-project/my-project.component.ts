import { Component, OnInit, Input } from '@angular/core';

import { Project } from '../../../../models/project.model';

@Component({
  selector: 'do-my-project',
  templateUrl: './my-project.component.html',
  styleUrls: [ './my-project.component.scss' ]
})
export class MyProjectComponent implements OnInit {
  // data about projectName, consumer, comment, myHours, participants - array with photo of participants
  @Input() project: Project;

  amountHiddenPhoto = 0;

  constructor() { }

  ngOnInit(): void {
    // determining the number of participants whose photos are not shown
    this.amountHiddenPhoto = this.project.contributors.length - 4;
  }

}
