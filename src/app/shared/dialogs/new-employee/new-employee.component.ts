import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

import { CreateUserRequest } from '@api/user-service/models/create-user-request';
import { CommunicationType, ContractTerm, CreateCommunicationRequest } from '@api/user-service/models';
import { UserService } from '@app/services/user/user.service';
import { Observable, Subject } from 'rxjs';
import { finalize, first, map, switchMap, takeUntil } from 'rxjs/operators';
import { RightsService } from '@app/services/rights/rights.service';
import { RoleInfo } from '@api/rights-service/models/role-info';
import { DoValidators } from '@app/validators/do-validators';
import { PositionService } from '@app/services/position/position.service';
import { DepartmentService } from '@app/services/department/department.service';
import { OfficeService } from '@app/services/company/office.service';
import { OperationResultResponse } from '@app/types/operation-result-response.interface';
import { OfficeInfo } from '@api/office-service/models/office-info';
import { CurrentCompanyService } from '@app/services/current-company.service';
import { Company } from '@app/models/company';
import { DepartmentInfo } from '@api/department-service/models/department-info';
import { ContractSubjectApiService } from '@api/company-service/services/contract-subject-api.service';
import { ContractSubjectInfo } from '@api/company-service/models/contract-subject-info';
import { getUTCWithOffset } from '@app/utils/utils';
import { AutocompleteConfigsService } from '@shared/component/autocomplete/autocomplete-configs.service';
import { LoadingState } from '@app/utils/loading-state';
import { WarningOnDialogClose } from '@app/utils/warning-on-dialog-close';
import { DialogRef } from '@angular/cdk/dialog';
import { DialogService } from '@shared/component/dialog/dialog.service';

@Component({
	selector: 'do-new-employee',
	templateUrl: './new-employee.component.html',
	styleUrls: ['./new-employee.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewEmployeeComponent extends LoadingState implements OnInit, OnDestroy {
	public userForm = this.initForm();
	public positionsConfig = this.autocompleteConfigs.getPositionsConfig();
	public department$!: Observable<DepartmentInfo[]>;
	public roles$!: Observable<RoleInfo[]>;
	public offices$!: Observable<OfficeInfo[]>;
	public contractTypes$!: Observable<ContractSubjectInfo[]>;

	private warningOnClose = new WarningOnDialogClose(this.dialogRef, this.dialog);

	private destroy$ = new Subject<void>();

	constructor(
		private _formBuilder: UntypedFormBuilder,
		private _userService: UserService,
		private dialogRef: DialogRef<any>,
		private _rightsService: RightsService,
		private _positionService: PositionService,
		private _departmentService: DepartmentService,
		private _officeService: OfficeService,
		private contractService: ContractSubjectApiService,
		private currentCompany: CurrentCompanyService,
		private autocompleteConfigs: AutocompleteConfigsService,
		private dialog: DialogService
	) {
		super();
	}

	public ngOnInit(): void {
		this.dialogRef.disableClose = true;

		this.department$ = this._departmentService
			.findDepartments({
				skipCount: 0,
				takeCount: 500,
			})
			.pipe(map((res) => res.body ?? []));
		this.roles$ = this._rightsService
			.findRoles({ skipCount: 0, takeCount: 500 })
			.pipe(map((res) => res.body ?? []));
		this.offices$ = this._officeService
			.findOffices({ skipCount: 0, takeCount: 500 })
			.pipe(map((res) => res.body ?? []));
		this.contractTypes$ = this.contractService
			.findContractSubjects({ skipCount: 0, takeCount: 500 })
			.pipe(map((res) => res.body ?? []));

		this.warningOnClose.closeEvents$.pipe(takeUntil(this.destroy$)).subscribe({
			next: () => this.beforeClose(),
		});
	}

	public ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}

	public beforeClose(): void {
		this.warningOnClose.beforeClose(this.isFormDirty());
	}

	public createEmployee(): void {
		this.setLoading(true);

		this.currentCompany.company$
			.pipe(
				first(),
				switchMap((company: Company) => {
					const params: CreateUserRequest = this._convertFormDataToCreateUserParams(company.id);
					return this._userService.createUser(params);
				}),
				finalize(() => this.setLoading(false))
			)
			.subscribe((result: OperationResultResponse) => {
				this.dialogRef.close(result);
			});
	}

	private isFormDirty(): boolean {
		const initialForm = this.initForm();
		return Object.keys(initialForm.controls).some(
			(k: string) => this.userForm.controls[k].value !== initialForm.controls[k].value
		);
	}

	private initForm(): UntypedFormGroup {
		return this._formBuilder.group({
			lastName: ['', [Validators.required, DoValidators.noWhitespaces, DoValidators.isNameValid]],
			firstName: ['', [Validators.required, DoValidators.noWhitespaces, DoValidators.isNameValid]],
			middleName: ['', [DoValidators.noWhitespaces, DoValidators.isNameValid]],
			dayOfBirth: [null],
			positionId: [null],
			startWorkingAt: [null, [Validators.required]],
			isAdmin: [false],
			rate: [null, [Validators.required]],
			departmentId: [null],
			officeId: [null],
			contractId: [null, [DoValidators.required]],
			email: ['', [Validators.required, DoValidators.email]],
			roleId: [null],
		});
	}

	private _convertFormDataToCreateUserParams(companyId: string): CreateUserRequest {
		const communications: CreateCommunicationRequest = {
			type: CommunicationType.Email,
			value: this.userForm.get('email')?.value as string,
		};
		const { dayOfBirth, startWorkingAt } = this.userForm.getRawValue();
		const dateOfBirthUtc = dayOfBirth && getUTCWithOffset(dayOfBirth);
		const startWorkingAtUtc = startWorkingAt && getUTCWithOffset(startWorkingAt);

		return {
			firstName: this.userForm.get('firstName')?.value?.trim(),
			lastName: this.userForm.get('lastName')?.value?.trim(),
			middleName: this.userForm.get('middleName')?.value?.trim(),
			positionId: this.userForm.get('positionId')?.value as string,
			departmentId: this.userForm.get('departmentId')?.value as string,
			isAdmin: this.userForm.get('isAdmin')?.value as boolean,
			communication: communications,
			officeId: this.userForm.get('officeId')?.value,
			roleId: this.userForm.get('roleId')?.value,
			dateOfBirth: dateOfBirthUtc,
			userCompany: {
				companyId: companyId,
				contractTermType: ContractTerm.Perpetual,
				startWorkingAt: startWorkingAtUtc,
				rate: this.userForm.get('rate')?.value,
				contractSubjectId: this.userForm.get('contractId')?.value,
			},
		};
	}
}
