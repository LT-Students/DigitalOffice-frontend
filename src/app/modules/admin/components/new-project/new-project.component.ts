import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { teamCards, TeamCard } from './team-cards';

@Component({
  selector: 'do-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss'],
})
export class NewProjectComponent {
  public teams: TeamCard[] = teamCards;
  profileForm = new FormGroup({
    projectName: new FormControl(''),
    shortProjectName: new FormControl(''),
    departments: new FormControl(''),
    projectDescription: new FormControl(''),
  });
  departments = ['one', 'two', 'three'];

  constructor() {}
}
