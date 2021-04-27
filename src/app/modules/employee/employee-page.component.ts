import { Component, OnInit } from '@angular/core';
import { EducationModel, StudyType } from '@app/models/education.model';
import { UserApiService } from '@data/api/user-service/services/user-api.service';
import { LocalStorageService } from '@app/services/local-storage.service';
import { UserService } from '@app/services/user.service';
import { UserInfo } from '@data/api/user-service/models/user-info';
import { UserResponse } from '@data/api/user-service/models/user-response';
import { UsersResponse } from '@data/api/user-service/models';
import { Project } from '@data/models/project';
import { tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { NewEmployeeComponent } from '../admin/components/new-employee/new-employee.component';
import { activeProject, closedProject, courses, institutes, skills } from './mock';

// eslint-disable-next-line no-shadow
export enum WorkFlowMode {
  EDIT = 'EDIT',
  VIEW = 'VIEW',
  ADD = 'ADD',
}

export interface Modes {
  skills: WorkFlowMode;
  education: WorkFlowMode;
  certificates: WorkFlowMode;
}

export interface UserProject extends Project {
  role: string;
  startedAt: Date;
  endedAt?: Date;
}

export interface Path {
  title: string;
  url?: string;
}

@Component({
  selector: 'do-employee-page',
  templateUrl: './employee-page.component.html',
  styleUrls: ['./employee-page.component.scss'],
})

export class EmployeePageComponent implements OnInit {
  public skills: string[];
  public institutes: EducationModel[];
  public courses: EducationModel[];
  public studyTypes: StudyType[];
  public userProjects: UserProject[];
  public paths: Path[];

  public userInfo: UserResponse;

  constructor(private userService: UserService, public dialog: MatDialog) {
    this.skills = skills;
    this.institutes = institutes;
    this.courses = courses;
    this.studyTypes = [
      StudyType.ABSENTIA,
      StudyType.CONFRONT,
      StudyType.PARTTIME,
      StudyType.OFFLINE,
      StudyType.ONLINE,
    ];
  }

  ngOnInit(): void {
    const user = this.userService.getCurrentUser();

    this.userProjects = this._getUserProjects();
    this.userService.getUser(user.user.id).subscribe((userResponse: UserResponse) => {
      console.log(userResponse);
      this.userInfo = userResponse;

      this.paths = [
        { title: 'Сотрудники', url: 'user/attendance' },
        { title: 'Департамент Цифровых Технологий', url: 'user/attendance' },
        { title: `${this.userInfo.user.firstName} ${this.userInfo.user.lastName}`, },
      ];
    });
  }


  private _getUserProjects(): UserProject[] {
    return [
      activeProject,
      {
        ...activeProject,
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      },
        ...Array(5).fill(closedProject)
    ];
  }

  onOpenNewEmployee(): void {
    const dialogRef = this.dialog.open(NewEmployeeComponent, {});
  }

}
