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
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { activeProject, closedProject, courses, institutes, skills } from './mock';
import { AdminRequestComponent } from './components/modals/admin-request/admin-request.component';

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
  public pageId: string;
  public isOwner: boolean;

  public userInfo: UserResponse;

  constructor(
    private userService: UserService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
  ) {
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
    this.pageId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    const user = this.userService.getCurrentUser();

    this.userProjects = this._getUserProjects();
    this.userService.getUser(user.id).subscribe((userResponse: UserResponse) => {
      console.log(userResponse);
      this.userInfo = userResponse;

      this.paths = [
        { title: 'Сотрудники', url: 'user/attendance' },
        { title: 'Департамент Цифровых Технологий', url: 'user/attendance' },
        { title: `${this.userInfo.user.firstName} ${this.userInfo.user.lastName}`, },
      ];
      this.isOwner = this.userInfo.user.id === this.pageId;
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

  openRequestDialog(): void {
    const dialogRef = this.dialog.open(AdminRequestComponent, {});
    dialogRef.afterClosed().subscribe((result) => {
      if (result.length > 0) {
        this.snackBar.open(result, 'accept');
      }
    });
  }

  openArchiveDialog(): void {
    const dialogRef = this.dialog.open(AdminRequestComponent, {});
    dialogRef.afterClosed().subscribe((result) => {
      this.snackBar.open(result, 'accept');
    });
  }

}
