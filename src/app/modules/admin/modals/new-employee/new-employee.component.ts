import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';

import { CreateUserRequest } from '@data/api/user-service/models/create-user-request';
import {
	CommunicationType,
	CreateCommunicationRequest,
	OperationResultResponse,
	UserGender,
	UserStatus,
} from '@data/api/user-service/models';
import { UserService } from '@app/services/user/user.service';
import { NetService } from '@app/services/net.service';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { RightsService } from '@app/services/rights/rights.service';
import { RoleInfo } from '@data/api/rights-service/models/role-info';
import { OfficeInfo } from '@data/api/company-service/models/office-info';
import { FindResultResponseDepartmentInfo } from '@data/api/company-service/models/find-result-response-department-info';
import { FindResultResponsePositionInfo } from '@data/api/company-service/models/find-result-response-position-info';
import { DoValidators } from '@app/validators/do-validators';

@Component({
	selector: 'do-new-employee',
	templateUrl: './new-employee.component.html',
	styleUrls: ['./new-employee.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewEmployeeComponent implements OnDestroy {
	public message: string;
	//public imagePath;
	//public imgURL: any;
	public userForm: FormGroup;
	public position$: Observable<FindResultResponsePositionInfo>;
	public department$: Observable<FindResultResponseDepartmentInfo>;
	public roles$: Observable<RoleInfo[]>;
	public offices$: Observable<OfficeInfo[]>;

	private _unsubscribe$: Subject<void>;

	constructor(
		private _formBuilder: FormBuilder,
		private _netService: NetService,
		private _userService: UserService,
		private _matSnackBar: MatSnackBar,
		private _dialogRef: MatDialogRef<any>,
		private _rightsService: RightsService
	) {
		this.message = '';
		this.userForm = this._initForm();
		this.position$ = this._netService.getPositionsList({ skipCount: 0, takeCount: 500 });
		this.department$ = this.department$ = this._netService.getDepartmentsList({ skipCount: 0, takeCount: 500 });
		this.roles$ = this._rightsService
			.findRoles({ skipCount: 0, takeCount: 500 })
			.pipe(map((res) => res.body ?? []));
		this.offices$ = this._netService
			.getOfficesList({ skipCount: 0, takeCount: 500 })
			.pipe(map((res) => res.body ?? []));
		this._unsubscribe$ = new Subject<void>();
	}

	public ngOnDestroy(): void {
		this._unsubscribe$.next();
		this._unsubscribe$.complete();
	}

	public createEmployee(): void {
		const params: CreateUserRequest = this._convertFormDataToCreateUserParams();

		this._userService
			.createUser(params)
			.pipe(takeUntil(this._unsubscribe$))
			.subscribe(
				(result: OperationResultResponse) => {
					if (result.errors && result.errors.length) {
						const message = result.errors.join('\n');
						this._matSnackBar.open(message, 'Закрыть');
					}
					this._matSnackBar.open('Пользователь успешно создан', 'Закрыть', { duration: 3000 });
					this._dialogRef.close(result);
				},
				(error: OperationResultResponse | HttpErrorResponse) => {
					let message =
						error && 'errors' in error
							? error.errors?.[0]
							: 'error' in error
							? error.error.message
							: 'Упс! Что-то пошло не так.';
					if (error.status === 409) {
						message = 'Пользователь с такой электронной почтой уже существует';
					}
					this._matSnackBar.open(message, 'Закрыть');
					throw error;
				}
			);
	}

	public changeWorkingRate(step: number): void {
		this.userForm.patchValue({
			rate: +this.userForm.get('rate')?.value + step,
		});
	}

	public onCancelClick() {
		return this._matSnackBar._openedSnackBarRef?.dismissWithAction();
	}

	private _initForm(): FormGroup {
		return this._formBuilder.group({
			lastName: ['', [Validators.required, DoValidators.noWhitespaces]],
			firstName: ['', [Validators.required, DoValidators.noWhitespaces]],
			middleName: ['', [DoValidators.noWhitespaces]],
			positionId: ['', [Validators.required]],
			startWorkingAt: [null],
			isAdmin: [false],
			rate: ['1', [Validators.required]],
			departmentId: [null],
			officeId: ['', [Validators.required]],
			email: ['', [Validators.required, DoValidators.email]],
			roleId: [null],
		});
	}

	private _convertFormDataToCreateUserParams(): CreateUserRequest {
		const communications: CreateCommunicationRequest[] = [
			{
				type: CommunicationType.Email,
				value: this.userForm.get('email')?.value as string,
			},
		];

		return {
			firstName: this.userForm.get('firstName')?.value?.trim(),
			lastName: this.userForm.get('lastName')?.value?.trim(),
			middleName: this.userForm.get('middleName')?.value?.trim(),
			positionId: this.userForm.get('positionId')?.value as string,
			departmentId: this.userForm.get('departmentId')?.value as string,
			rate: this.userForm.get('rate')?.value as number,
			isAdmin: this.userForm.get('isAdmin')?.value as boolean,
			communications: communications,
			startWorkingAt: this.userForm.get('startWorkingAt')?.value as string,
			status: UserStatus.WorkFromHome,
			gender: UserGender.NotSelected,
			officeId: this.userForm.get('officeId')?.value,
			roleId: this.userForm.get('roleId')?.value,
		};
	}
}
