import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { NewMembersBoardComponent } from '../new-members-board/new-members-board.component';

import { teamCards, TeamCard } from './team-cards';

@Component({
  selector: 'do-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss'],
})
export class NewProjectComponent {
  public teams: TeamCard[] = teamCards;
  public profileForm = new FormGroup({
    name: new FormControl(''),
    shortName: new FormControl(''),
    departments: new FormControl(''),
    description: new FormControl(''),
  });
  public departments = ['one', 'two', 'three'];
  public team = [
    {
      name: 'Olya',
      profileImgSrc: '',
    },
    {
      name: 'Slava',
      profileImgSrc: '',
    },
    {
      name: 'Nikita',
      profileImgSrc: '',
    },
    {
      name: 'Olya',
      profileImgSrc: '',
    },
    {
      name: 'Slava',
      profileImgSrc: '',
    },
  ];

  constructor(public dialog: MatDialog) {}

  public addMember(): void {
    this.dialog.open(NewMembersBoardComponent, {
      width: '720px',
      height: '650px',
    });
  }
}
