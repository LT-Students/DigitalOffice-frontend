import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '@app/services/user/user.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { EMPTY, Observable, Subject } from 'rxjs';
import { ProjectService } from '@app/services/project/project.service';
import { map, skip, switchMap, takeUntil } from 'rxjs/operators';
import { User } from '@app/models/user/user.model';
import { CurrentUserService } from '@app/services/current-user.service';
import { CommunicationType, CommunicationInfo } from '@api/user-service/models';
import { DialogService } from '@app/services/dialog.service';
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
	private _unsubscribe$$: Subject<void>;
	public selectedUser$: Observable<User>;
	public userLogged$: Observable<boolean | undefined>;

	constructor(
		private dialog: DialogService,
		private userService: UserService,
		private _projectService: ProjectService,
		private _employeeService: EmployeePageService,
		private _route: ActivatedRoute,
		private _router: Router,
		private _cdr: ChangeDetectorRef,
		private _currentUserService: CurrentUserService
	) {
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

	public archiveUser(userId: string): void {
		this.dialog
			.confirm({
				confirmText: 'Да, удалить',
				title: 'Удаление пользователя',
				message: 'Вы действительно хотите удалить этого пользователя?',
			})
			.afterClosed()
			.pipe(switchMap((confirmed?: boolean) => (confirmed ? this.userService.disableUser(userId) : EMPTY)))
			.subscribe();
	}

	public restoreUser(user: User, communications: CommunicationInfo[] = []): void {
		const emails = communications.filter(
			(c: CommunicationInfo) => c.type === CommunicationType.Email || c.type === CommunicationType.BaseEmail
		);

		this.dialog.recoverUser(user.id, emails, !!user.pendingCommunicationId);
	}

	public ngOnDestroy(): void {
		this._unsubscribe$$.next();
		this._unsubscribe$$.complete();
	}
}
