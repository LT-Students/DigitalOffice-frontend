import { Component, OnDestroy, OnInit } from '@angular/core';
import { EducationModel, StudyType } from '@app/models/education.model';
import { UserApiService } from '@data/api/user-service/services/user-api.service';
import { LocalStorageService } from '@app/services/local-storage.service';
import { UserService } from '@app/services/user.service';
import { UserInfo } from '@data/api/user-service/models/user-info';
import { UserResponse } from '@data/api/user-service/models/user-response';
import { UsersResponse } from '@data/api/user-service/models';
import { Project } from '@data/models/project';
import { takeUntil, tap } from 'rxjs/operators';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { activeProject, closedProject, skills } from './mock';
import { AdminRequestComponent } from './components/modals/admin-request/admin-request.component';
import { ArchiveComponent } from './components/modals/archive/archive.component';
import { Subject, Subscription } from 'rxjs';
import { ProjectService } from '@app/services/project.service';
import { ProjectInfo } from '@data/api/project-service/models/project-info';
import { User } from '@app/models/user.model';

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

export class EmployeePageComponent implements OnInit, OnDestroy {
  public skills: string[];
  public institutes: EducationModel[];
  public courses: EducationModel[];
  public studyTypes: StudyType[];
  public userProjects: UserProject[];
  public paths: Path[];
  public pageId: string;
  public isOwner: boolean;
  public userData: UserResponse;
  public user: User;

  private dialogRef;
  private _unsubscribe$: Subject<void>;

  constructor(
    private _userService: UserService,
    private _projectService: ProjectService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
  ) {
    this.skills = skills;
    // TODO: Replace with enum values
    this.studyTypes = [
      StudyType.ABSENTIA,
      StudyType.CONFRONT,
      StudyType.PARTTIME,
      StudyType.OFFLINE,
      StudyType.ONLINE,
    ];
    this.pageId = this.route.snapshot.paramMap.get('id');
    this.userData = null;
    this.user = null;
    this._unsubscribe$ = new Subject<void>();
  }

  ngOnInit(): void {
    const user: UserInfo = this._userService.getCurrentUser();

    this.isOwner = user.id === this.pageId;

    /*this.userService.getUser(user.id).subscribe((userResponse: UserResponse) => {
      console.log(userResponse);
      this.userData = userResponse;
    });*/
    /* TODO: BehaviorSubject with userResponse as initial value */
    this._userService.getMockUser().pipe(takeUntil(this._unsubscribe$))
    .subscribe((userResponse: UserResponse) => {
      this.user = new User(userResponse);
      this.userData = userResponse;
    });

    this._projectService.getUserProjectsInfo(this.user.projects).pipe(takeUntil(this._unsubscribe$)).subscribe((projects: ProjectInfo[]) => {
      console.log(projects);
    });

    this.paths = [
      { title: 'Сотрудники', url: 'user/attendance' },
      { title: `${ this.user.department.name }`, url: `departments/${ this.user.department.id }` },
      { title: `${ this.user.firstName } ${ this.user.lastName }` },
    ];
  }

  ngOnDestroy() {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  onOpenDialog(): void {
    const dialogComponent = this.user.isAdmin ? ArchiveComponent : AdminRequestComponent;

    this.dialogRef = this.dialog.open(dialogComponent, {});
    this.dialogRef.afterClosed().subscribe((result: string) => {
      this.showMessage(result);
    });
  }

  showMessage(message: string): void {
    if (message) {
      this.snackBar.open(message, 'accept', { duration: 3000 });
    }
  }

}
