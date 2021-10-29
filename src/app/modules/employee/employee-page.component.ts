import { Component, OnDestroy, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { UserService } from '@app/services/user/user.service';
import { EducationType, OperationResultResponse, OperationResultStatusType } from '@data/api/user-service/models';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, Observable, Subject, BehaviorSubject, ReplaySubject, pipe, Subscription, observable } from 'rxjs';
import { ProjectService } from '@app/services/project/project.service';
import { filter, map, publishBehavior, switchMap, takeUntil, tap, skip } from 'rxjs/operators';
import { EmployeePageService } from '@app/services/employee-page.service';
import { UserInfo } from '@data/api/user-service/models/user-info';
import { ModalService } from '@app/services/modal.service';
import { IUserGender } from '@app/models/user/personal-info-manager';
import { User } from '@app/models/user/user.model';
import { CurrentUserService } from '@app/services/current-user.service';
import { NewEmployeeComponent } from '../admin/modals/new-employee/new-employee.component';
import { AdminRequestComponent } from './modals/admin-request/admin-request.component';
import { ArchiveComponent } from './modals/archive/archive.component';

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

@Component({
	selector: 'do-employee-page',
	templateUrl: './employee-page.component.html',
	styleUrls: ['./employee-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeePageComponent implements OnInit, OnDestroy {
	public studyTypes: EducationType[];
	// public paths: Path[];
	// public isOwner: boolean;

	// private dialogRef;
	private _unsubscribe$: Subject<void>;
	public userInfo: UserInfo[] | undefined;
	public userId: string | undefined;
	private _isAdmin: boolean;
	// public isActive: boolean;
	private _selectedUser: ReplaySubject<User>;
	public selectedUser$: Observable<User>;
	private userLogged: ReplaySubject<User>;
	public userLogged$: Observable<boolean>;
	public isActiveUserSelected$: Observable<boolean>;

	constructor(
		private _dialog: MatDialog,
		private _userService: UserService,
		private _projectService: ProjectService,
		private _employeeService: EmployeePageService,
		private _route: ActivatedRoute,
		private _router: Router,
		private _snackBar: MatSnackBar,
		private _cdr: ChangeDetectorRef,
		private _modalService: ModalService,
		private _currentUserService: CurrentUserService
	) {
		this.studyTypes = [EducationType.Offline, EducationType.Online];
		this._unsubscribe$ = new Subject<void>();
		this.userInfo = [];
		this.userId = '';
		this._isAdmin = false;
		// this.isActive = false;
		// this.isOwner = false;
		this._selectedUser = new ReplaySubject<User>(1);
		this.selectedUser$ = this._selectedUser.asObservable();
		this.userLogged = new ReplaySubject<User>(1);
		this.userLogged$ = this._currentUserService.user$.pipe(map((item) => item.isAdmin));
		this.isActiveUserSelected$ = this.selectedUser$.pipe(map((item) => item.isActive));
	}

	public ngOnInit(): void {
		// this.isOwner = user.id === this.pageId;
		this.selectedUser$ = this._route.paramMap.pipe(
			skip(1),
			takeUntil(this._unsubscribe$),
			switchMap((params: ParamMap) => this._employeeService.getEmployee(params.get('id') as string))
		);
	}

	public onDeleteEmployeeClick(userId: string | undefined): void {
		this._modalService
			.confirm({
				confirmText: 'Да, удалить',
				title: 'Удаление пользователя',
				message: 'Вы действительно хотите удалить этого пользователя?',
			})
			.afterClosed()
			.pipe(
				switchMap((confirm) => (confirm ? this._userService.disableUser(userId) : EMPTY)),
				switchMap(() => this._employeeService.getEmployee(this.userId as string))
			)
			.subscribe();
	}

	onRestoreEmployeeClick(userId: string | undefined) {
		this._modalService
			.confirm({
				confirmText: 'Да, восстановить',
				title: 'Восстановление пользователя',
				message: 'Вы действительно хотите восстановить этого пользователя?',
			})
			.afterClosed()
			.pipe(
				switchMap((confirm) => (confirm ? this._userService.activateUser(userId) : EMPTY)),
				switchMap(() => this._employeeService.getEmployee(this.userId as string))
			)
			.subscribe();
	}

	public ngOnDestroy(): void {
		this._unsubscribe$.next();
		this._unsubscribe$.complete();
	}

	// onOpenDialog(): void {
	// 	const dialogComponent = this.user.isAdmin ? ArchiveComponent : AdminRequestComponent;
	//
	// 	this.dialogRef = this._dialog.open(dialogComponent, {});
	// 	this.dialogRef.afterClosed().subscribe((result: string) => {
	// 		this.showMessage(result);
	// 	});
	// }
	//
	// showMessage(message: string): void {
	// 	if (message) {
	// 		this._snackBar.open(message, 'accept', { duration: 3000 });
	// 	}
	// }
}
