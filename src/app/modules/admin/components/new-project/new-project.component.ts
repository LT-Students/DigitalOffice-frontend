import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { INewMember } from '@app/interfaces/INewMember';
import { MatDialog } from '@angular/material/dialog';
import { NewMembersBoardComponent } from '../new-members-board/new-members-board.component';
import { teamCards, TeamCard } from './team-cards';

@Component({
  selector: 'do-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss'],
})
export class NewProjectComponent implements OnInit {
  public projectForm: FormGroup;
  public teams: TeamCard[] = teamCards;
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
  ];

  constructor(public dialog: MatDialog, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.projectForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(80)]],
      shortName: ['', [Validators.required, Validators.maxLength(32)]],
      departments: ['', [Validators.required, Validators.maxLength(32)]],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      additionInfo: [''],
      department: [''],
    });
  }

  public addMember(): void {
    this.dialog.open(NewMembersBoardComponent, {
      width: '720px',
      height: '650px',
    });
  }

  public createProject(): void {}
  public saveDraft(): void {
    console.log('Сохранить черновик');
  }
}
