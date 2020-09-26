import { Component, OnInit } from '@angular/core';

import { teamCards } from './team-cards';

@Component({
  selector: 'do-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss']
})
export class NewProjectComponent implements OnInit {
  teams = teamCards;
  constructor() { }

  ngOnInit(): void {
  }

}
