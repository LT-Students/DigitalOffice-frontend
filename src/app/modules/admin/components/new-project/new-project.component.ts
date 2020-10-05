import { Component } from '@angular/core';

import { teamCards, TeamCard } from './team-cards';

@Component({
  selector: 'do-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: [ './new-project.component.scss' ]
})
export class NewProjectComponent {
  public teams: TeamCard[] = teamCards;

  constructor() { }
}
