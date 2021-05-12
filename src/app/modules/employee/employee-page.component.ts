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
import { activeProject, closedProject, courses, institutes, skills } from './mock';
import { AdminRequestComponent } from './components/modals/admin-request/admin-request.component';
import { ArchiveComponent } from './components/modals/archive/archive.component';
import { Subject, Subscription } from 'rxjs';

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

  private dialogRef;
  private _subscription: Subscription;
  private _unsubscribe$: Subject<void>;

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
    this.userData = null;
    this._subscription = new Subscription();
    this._unsubscribe$ = new Subject<void>();
  }

  ngOnInit(): void {
    const user: UserInfo = this.userService.getCurrentUser();

    this.isOwner = user.id === this.pageId;

    this.userProjects = this._getUserProjects();
    /*this.userService.getUser(user.id).subscribe((userResponse: UserResponse) => {
      console.log(userResponse);
      this.userData = userResponse;
    });*/
    /* TODO: BehaviorSubject with userResponse as initial value */
    const user$ = this.userService.getMockUser().pipe(takeUntil(this._unsubscribe$))
    .subscribe((userResponse: UserResponse) => this.userData = userResponse);
    this._subscription.add(user$);

    this.paths = [
      { title: 'Сотрудники', url: 'user/attendance' },
      { title: `${this.userData.department.name}`, url: `departments/${this.userData.department.id}` },
      { title: `${this.userData.user.firstName} ${this.userData.user.lastName}`},
    ];
  }

  ngOnDestroy() {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
    this._subscription.unsubscribe();
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

  onOpenDialog(): void {
    const dialogComponent = this.userData.user.isAdmin ? ArchiveComponent : AdminRequestComponent;

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
