import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { MatDialogRef } from '@angular/material/dialog';
import { IUser } from '@data/models/user';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { HttpErrorResponse } from '@angular/common/http';
import { CreateUserRequest } from '@data/api/user-service/models/create-user-request';
import { CommunicationInfo } from '@data/api/user-service/models/communication-info';
import { CommunicationType, DepartmentInfo, OperationResultResponse, PositionInfo, UserStatus } from '@data/api/user-service/models';
import { UserService } from '@app/services/user.service';
import { NetService } from '@app/services/net.service';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { RoleApiService } from '@data/api/rights-service/services/role-api.service';
import { RolesResponse } from '@data/api/rights-service/models/roles-response';
import { RoleInfo } from '@data/api/rights-service/models/role-info';

export const DATE_FORMAT = {
	parse: {
		dateInput: 'LL',
	},
	display: {
		dateInput: 'd MMMM y',
		monthYearLabel: 'YYYY',
	},
};

@Component({
	selector: 'do-new-employee',
	templateUrl: './new-employee.component.html',
	styleUrls: ['./new-employee.component.scss'],
	providers: [
		{
			provide: DateAdapter,
			useClass: MomentDateAdapter,
			deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
		},
		{ provide: MAT_DATE_FORMATS, useValue: DATE_FORMAT },
	],
})
export class NewEmployeeComponent implements OnInit, OnDestroy {
	public user: IUser;
	public message: string;
	public imagePath;
	public imgURL: any;
	public userForm: FormGroup = null;
	public position$: Observable<PositionInfo[]>;
	public department$: Observable<DepartmentInfo[]>;
	public roles: Array<RoleInfo>;

	private _unsubscribe$: Subject<void>;

	constructor(
		private formBuilder: FormBuilder,
		private _netService: NetService,
		private userService: UserService,
		private _matSnackBar: MatSnackBar,
		private dialogRef: MatDialogRef<any>,
		private roleApiService: RoleApiService
	) {
		this._unsubscribe$ = new Subject<void>();
	}

	public ngOnInit(): void {
		this.getPositions();
		this.getDepartments();
		this.getRoles();
		this._initForm();
	}

	public ngOnDestroy() {
		this._unsubscribe$.next();
		this._unsubscribe$.complete();
	}

	public getPositions(): void {
		this.position$ = this._netService.getPositionsList();
	}

	public getDepartments(): void {
		this.department$ = this._netService.getDepartmentsList();
	}

	public getRoles(): void {
		this.roleApiService
			.findRoles({ skipCount: 0, takeCount: 10 })
			.subscribe((result: RolesResponse) => {
				this.roles = result.roles;
			});
	}

	public createEmployee(): void {
		const params: CreateUserRequest = this._convertFormDataToCreateUserParams();

		this.userService
			.createUser(params)
			.pipe(takeUntil(this._unsubscribe$))
			.subscribe(
				(result: OperationResultResponse) => {
					if (result.errors && result.errors.length) {
						const message = result.errors.join('\n');
						this._matSnackBar.open(message, 'Закрыть');
					}
					this.dialogRef.close(result);
				},
				(error: OperationResultResponse | HttpErrorResponse) => {
					const message =
						error && 'errors' in error ? error.errors[0] : 'error' in error ? error.error.message : 'Упс! Что-то пошло не так.';
					this._matSnackBar.open(message + ' Попробуйте позже', 'Закрыть');
				}
			);
	}

	public changeWorkingRate(step: number): void {
		this.userForm.patchValue({
			rate: +this.userForm.get('rate').value + step,
		});
	}

	public generatePassword() {
		return this._netService
			.generatePassword()
			.pipe(takeUntil(this._unsubscribe$))
			.subscribe((password: string) => {
				this.userForm.patchValue({ password: password });
				this.userForm.updateValueAndValidity();
			});
	}

	public onCancelClick() {
		return this._matSnackBar._openedSnackBarRef.dismissWithAction();
	}

	private _initForm(): void {
		this.userForm = this.formBuilder.group({
			lastName: ['', [Validators.required, Validators.maxLength(32)]],
			firstName: ['', [Validators.required, Validators.maxLength(32)]],
			middleName: ['', [Validators.maxLength(32)]],
			positionId: ['', [Validators.required]],
			startWorkingAt: [''],
			rate: ['1', [Validators.required]],
			departmentId: [''],
			office: ['', [Validators.required]],
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required]],
			roleId: ['']
		});
	}

	private _convertFormDataToCreateUserParams(): CreateUserRequest {
		const communications: CommunicationInfo[] = [
			{
				type: CommunicationType.Email,
				value: this.userForm.get('email').value as string,
			},
		];

		const params: CreateUserRequest = {
			firstName: this.userForm.get('firstName').value as string,
			lastName: this.userForm.get('lastName').value as string,
			middleName: this.userForm.get('middleName').value as string,
			password: this.userForm.get('password').value as string,
			positionId: this.userForm.get('positionId').value as string,
			departmentId: this.userForm.get('departmentId').value as string,
			rate: this.userForm.get('rate').value as number,
			isAdmin: false,
			communications: communications,
			startWorkingAt: this.userForm.get('startWorkingAt').value as string,
			status: UserStatus.WorkFromHome,
		};

		return params;
	}
}
