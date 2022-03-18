import { Component, OnDestroy, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { UserService } from '@app/services/user/user.service';
import { EducationType, OperationResultResponse } from '@api/user-service/models';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, iif, Observable, Subject } from 'rxjs';
import { ProjectService } from '@app/services/project/project.service';
import { map, switchMap, takeUntil, skip } from 'rxjs/operators';
import { ModalService } from '@app/services/modal.service';
import { User } from '@app/models/user/user.model';
import { CurrentUserService } from '@app/services/current-user.service';
import { ConfirmDialogData } from '@shared/modals/confirm-dialog/confirm-dialog.component';
import { EmployeePageService } from './services/employee-page.service';

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

	private _unsubscribe$$: Subject<void>;
	public selectedUser$: Observable<User>;
	public userLogged$: Observable<boolean | undefined>;

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
		this._unsubscribe$$ = new Subject<void>();
		this.selectedUser$ = this._employeeService.selectedUser$;
		this.userLogged$ = this._currentUserService.user$.pipe(map((user) => user.isAdmin));
	}

	public ngOnInit(): void {
		this._route.paramMap
			.pipe(
				skip(1),
				takeUntil(this._unsubscribe$$),
				switchMap((params: ParamMap) => this._employeeService.getEmployee(params.get('id') as string))
			)
			.subscribe();
	}

	public onActionEmployeeClick(userId: string | undefined, action: 'activate' | 'disable'): void {
		if (!userId) {
			return;
		}
		let actionWithUser$: Observable<OperationResultResponse>;
		let config: ConfirmDialogData;
		if (action === 'disable') {
			actionWithUser$ = this._userService.disableUser(userId);
			config = {
				confirmText: 'Да, удалить',
				title: 'Удаление пользователя',
				message: 'Вы действительно хотите удалить этого пользователя?',
			};
		} else {
			actionWithUser$ = this._userService.activateUser(userId);
			config = {
				confirmText: 'Да, восстановить',
				title: 'Восстановление пользователя',
				message: 'Вы действительно хотите восстановить этого пользователя?',
			};
		}
		this._modalService
			.confirm(config)
			.afterClosed()
			.pipe(
				switchMap((confirm) => iif(() => !!confirm, actionWithUser$, EMPTY)),
				switchMap(() => this._employeeService.getEmployee(userId))
			)
			.subscribe();
	}

	public ngOnDestroy(): void {
		this._unsubscribe$$.next();
		this._unsubscribe$$.complete();
	}
}
