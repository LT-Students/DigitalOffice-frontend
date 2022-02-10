import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';

import { CreateUserRequest } from '@data/api/user-service/models/create-user-request';
import {
	CommunicationType,
	CreateCommunicationRequest,
	OperationResultResponse,
	UserStatus,
} from '@data/api/user-service/models';
import { UserService } from '@app/services/user/user.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { finalize, map, takeUntil } from 'rxjs/operators';
import { RightsService } from '@app/services/rights/rights.service';
import { RoleInfo } from '@data/api/rights-service/models/role-info';
import { OfficeInfo } from '@data/api/company-service/models/office-info';
import { FindResultResponseDepartmentInfo } from '@data/api/department-service/models/find-result-response-department-info';
import { FindResultResponsePositionInfo } from '@data/api/position-service/models/find-result-response-position-info';
import { DoValidators } from '@app/validators/do-validators';
import { PositionService } from '@app/services/position/position.service';
import { DepartmentService } from '@app/services/department/department.service';
import { OfficeService } from '@app/services/company/office.service';

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
	public loading$$: BehaviorSubject<boolean>;

	private _unsubscribe$: Subject<void>;

	constructor(
		private _formBuilder: FormBuilder,
		private _userService: UserService,
		private _dialogRef: MatDialogRef<any>,
		private _rightsService: RightsService,
		private _positionService: PositionService,
		private _departmentService: DepartmentService,
		private _officeService: OfficeService
	) {
		this.message = '';
		this.loading$$ = new BehaviorSubject<boolean>(false);
		this.userForm = this._initForm();
		this.position$ = this._positionService.findPositions({ skipcount: 0, takecount: 500 });
		this.department$ = this.department$ = this._departmentService.findDepartments({
			skipCount: 0,
			takeCount: 500,
		});
		this.roles$ = this._rightsService
			.findRoles({ skipCount: 0, takeCount: 500 })
			.pipe(map((res) => res.body ?? []));
		this.offices$ = this._officeService
			.findOffices({ skipCount: 0, takeCount: 500 })
			.pipe(map((res) => res.body ?? []));
		this._unsubscribe$ = new Subject<void>();
	}

	public ngOnDestroy(): void {
		this._unsubscribe$.next();
		this._unsubscribe$.complete();
	}

	public createEmployee(): void {
		this.loading$$.next(true);
		const params: CreateUserRequest = this._convertFormDataToCreateUserParams();

		this._userService
			.createUser(params)
			.pipe(
				finalize(() => this.loading$$.next(false)),
				takeUntil(this._unsubscribe$)
			)
			.subscribe(
				(result: OperationResultResponse) => {
					this._dialogRef.close(result);
				},
				(error: OperationResultResponse | HttpErrorResponse) => {
					throw error;
				}
			);
	}

	public changeWorkingRate(step: number): void {
		this.userForm.patchValue({
			rate: +this.userForm.get('rate')?.value + step,
		});
	}

	private _initForm(): FormGroup {
		return this._formBuilder.group({
			lastName: ['', [Validators.required, DoValidators.noWhitespaces]],
			firstName: ['', [Validators.required, DoValidators.noWhitespaces]],
			middleName: ['', [DoValidators.noWhitespaces]],
			positionId: ['', [Validators.required]],
			startWorkingAt: [null],
			isAdmin: [{ value: true, disabled: true }],
			rate: ['1', [Validators.required]],
			departmentId: [null],
			officeId: ['', [Validators.required]],
			email: ['', [Validators.required, DoValidators.email]],
			roleId: [null],
		});
	}

	private _convertFormDataToCreateUserParams(): CreateUserRequest {
		const communication: CreateCommunicationRequest = {
			type: CommunicationType.Email,
			value: this.userForm.get('email')?.value as string,
		};

		return {
			firstName: this.userForm.get('firstName')?.value?.trim(),
			lastName: this.userForm.get('lastName')?.value?.trim(),
			middleName: this.userForm.get('middleName')?.value?.trim(),
			positionId: this.userForm.get('positionId')?.value as string,
			departmentId: this.userForm.get('departmentId')?.value as string,
			rate: this.userForm.get('rate')?.value as number,
			isAdmin: this.userForm.get('isAdmin')?.value as boolean,
			communication,
			startWorkingAt: this.userForm.get('startWorkingAt')?.value as string,
			status: UserStatus.WorkFromHome,
			officeId: this.userForm.get('officeId')?.value,
			roleId: this.userForm.get('roleId')?.value,
		};
	}
}
