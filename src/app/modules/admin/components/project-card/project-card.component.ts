import { Component, OnInit, Input } from '@angular/core';

import { DEPRECATED_Project2 } from '../../../../core/models/project.model';

@Component({
  selector: 'do-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss'],
})
export class ProjectCardComponent implements OnInit {
  // data about projectName, consumer, comment, myHours, participants - array with photo of participants
  @Input() project: DEPRECATED_Project2;
  @Input() showStatisticsBtn: true | false = false;

  amountHiddenPhoto = 0;

  constructor() {}

  ngOnInit(): void {
    // determining the number of participants whose photos are not shown
    this.amountHiddenPhoto = this.project.contributors.length - 4;
  }
}
