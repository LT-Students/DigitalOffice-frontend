import { Component, OnDestroy, OnInit } from '@angular/core';
import { EducationModel } from '@app/models/education.model';
import { UserService } from '@app/services/user.service';
import { UserInfo } from '@data/api/user-service/models/user-info';
import { UserResponse } from '@data/api/user-service/models/user-response';
import { EducationType } from '@data/api/user-service/models';
import { Project } from '@data/models/project';
import { takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminRequestComponent } from './components/modals/admin-request/admin-request.component';
import { ArchiveComponent } from './components/modals/archive/archive.component';
import { Subject } from 'rxjs';
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
  public institutes: EducationModel[];
  public courses: EducationModel[];
  public studyTypes: EducationType[];
  public userProjects: UserProject[];
  public paths: Path[];
  public pageId: string;
  public isOwner: boolean;
  public user: User;

  private dialogRef;
  private _unsubscribe$: Subject<void>;

  constructor(
    private _userService: UserService,
    private _projectService: ProjectService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {

    const user: UserInfo = this._userService.getCurrentUser();
    this.pageId = this.route.snapshot.paramMap.get('id');
    if (!this.pageId) {
      this.router.navigate([`employee/${user.id}`]);
    }
    // TODO: Replace with enum values
    this.studyTypes = [
      EducationType.Offline,
      EducationType.Online,
    ];
    this.user = null;
    this._unsubscribe$ = new Subject<void>();
  }

  ngOnInit(): void {
    const user: UserInfo = this._userService.getCurrentUser();

    this.isOwner = user.id === this.pageId;

    // this._userService.getUser(this.pageId).pipe(takeUntil(this._unsubscribe$))
    // .subscribe((userResponse: UserResponse) => {
    //   this.user = new User(userResponse);
    //
    // });
    /* TODO: BehaviorSubject with userResponse as initial value */
    this._userService.getMockUser(this.pageId).pipe(takeUntil(this._unsubscribe$))
    .subscribe((userResponse: UserResponse) => {
      this.user = new User(userResponse);
      this.paths = [
        { title: 'Сотрудники', url: 'user/attendance' },
        {
          title: (this.user.department) ? `${ this.user.department.name }` : 'Тестовый департамент',
          url: (this.user.department) ? `departments/${ this.user.department.id }` : 'department/id',
        },
        { title: `${ this.user.firstName } ${ this.user.lastName }` },
      ];
    });

    this._projectService.getUserProjectsInfo(this.user.projects).pipe(takeUntil(this._unsubscribe$)).subscribe((projects: ProjectInfo[]) => {
      console.log(projects);
    });
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
