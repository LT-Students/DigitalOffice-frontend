import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NewMembersBoardComponent } from './modals/new-members-board/new-members-board.component';
import { TeamCard, teamCards } from './team-cards';
import { DepartmentInfo } from '@data/api/user-service/models/department-info';
import { ProjectStatus } from '@app/models/project-status';
import { ProjectStatusType } from '@data/api/project-service/models/project-status-type';
import { ProjectService } from '@app/services/project.service';
import { DeleteDirectionComponent, ModalApprovalConfig } from './modals/delete-direction/delete-direction.component';

export enum ModalType {
  CREATE,
  DELETE,
  ADD,
  WATCH
}

@Component({
  selector: 'do-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss'],
})
export class NewProjectComponent implements OnInit {
  public projectForm: FormGroup;
  public teams: TeamCard[] = teamCards;
  // TODO: REPLACE WITH API
  public departments: DepartmentInfo[];
  public statuses: ProjectStatus[];
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

  constructor(public dialog: MatDialog,
              private formBuilder: FormBuilder,
              private _projectService: ProjectService) {
    this.statuses = [
        new ProjectStatus(ProjectStatusType.Active),
        new ProjectStatus(ProjectStatusType.Closed),
        new ProjectStatus(ProjectStatusType.Suspend),
    ]
    this.departments = [
      {
        id: 'cc289eba-ada8-11eb-8529-0242ac130003',
        name: 'Департамент Цифровых решений',
        startWorkingAt: '14/14/21'
      },
      {
        id: 'f3a25346-ada8-11eb-8529-0242ac130003',
        name: 'Департамент тестовых решений',
        startWorkingAt: '14/14/21'
      },
      {
        id: 'f6fd15ee-ada8-11eb-8529-0242ac130003',
        name: 'Департамент медицинских решений',
        startWorkingAt: '14/14/21'
      },
    ];
}

  ngOnInit(): void {
    this.projectForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(80)]],
      shortName: ['', [Validators.required, Validators.maxLength(32)]],
      departments: ['', [Validators.required, Validators.maxLength(32)]],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      checkControl: ['', [Validators.required]],
      additionInfo: [''],
      department: [''],
      customer: [''],
      status: [''],
      picker: [''],
    });
  }

  public addMember(): void {
    this.dialog.open(NewMembersBoardComponent, {
      data: teamCards[1],
      width: '720px',
      height: '650px',
    });
  }

  public createProject(): void {}
  public onAddTeamClick(): void {
    this.addMember();
  }
  public callDeleteModal(teamName: string): void {
    this.dialog.open<DeleteDirectionComponent, ModalApprovalConfig>(DeleteDirectionComponent, {
      data: {
        text: {
          main: 'Удаление направления',
          additional: `Вы действительно хотите удалить направление “${teamName}” вместе со всеми участниками?`
        },
        actions: {
          negative: 'Отменить',
          positive: 'Да, удалить'
        }
      },
      width: '500px',
    });
  }
  onModalCalled(modalType: ModalType) {
    switch (modalType) {
      case ModalType.DELETE:
        this.callDeleteModal('Back-End Разработчики');
        break;
    //    TODO: delete handler for all types
    }
  }
  public showProjectTeam(): void {}
  public saveDraft(): void {
    console.log('Сохранить черновик');
  }
}
