import { Component, OnInit, ChangeDetectionStrategy, Input, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { TimeDurationService } from '@app/services/time-duration.service';
import { IEditWorkTimeRequest, IFindStatRequest, TimeService } from '@app/services/time/time.service';
import { DoValidators } from '@app/validators/do-validators';
import { LeaveTimeInfo, OperationResultResponse, OperationResultStatusType, StatInfo } from '@data/api/time-service/models';
import { DatePeriod } from '@data/models/date-period';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface EmployeeInformation {
	id?: string;
	workTimeId?: string;
	editMode?: boolean;
	firstName?: string | null;
	lastName?: string | null;
	middleName?: string | null;
	position?: string;
	projectHours?: number | null;
	managerHours?: number | null;
	normHours?: number;
	leaves?: LeaveTimeInfo[];
	projectsCount?: number;
}

@Component({
	selector: 'do-team-statistics',
	templateUrl: './team-statistics.component.html',
	styleUrls: ['./team-statistics.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamStatisticsComponent implements OnInit {
	@Input() projectId: string;

	public hoursGroup: FormGroup;

	public selectedPeriod: DatePeriod;
	public employees$: Observable<EmployeeInformation[]>;

	public pageSize: number;
	public pageIndex: number;
	public totalCount: number;

	constructor(
		private _timeService: TimeService,
		private _timeDurationService: TimeDurationService,
		private _formBuilder: FormBuilder,
		private _cdr: ChangeDetectorRef
	) {
		this.hoursGroup = this._formBuilder.group({});
		this.employees$ = new Observable();
		this.projectId = '';
		this.selectedPeriod = this._setDatePeriod(new Date());
		this.pageIndex = 0;
		this.pageSize = 20;
		this.totalCount = 0;
	}

	ngOnInit(): void {
		this.employees$ = this._getEmployees();
	}

	public chosenMonthHandler(date: Date): void {
		this.selectedPeriod = this._setDatePeriod(date);
		this.employees$ = this._getEmployees()
	}

	public toggleEditMode(editMode: boolean, employee: EmployeeInformation): void {
		employee.editMode = editMode;

		if (editMode) {
			const year: number = this.selectedPeriod.startDate?.getFullYear()!
			const month: number = this.selectedPeriod.startDate?.getMonth()!

			const validators: ValidatorFn[] = [
				Validators.min(0),
				Validators.max(this._timeDurationService.countMaxMonthDuration(year, month)),
				DoValidators.number
			]

			this.hoursGroup.addControl(`hours_${employee.id}`, this._formBuilder.control(employee.managerHours ?? 0, validators));
		}
		else {
			this.hoursGroup.removeControl(`hours_${employee.id}`);
		}
	}

	public onSubmit(type: 'submit' | 'reset', employee: EmployeeInformation): void {
		if (this.hoursGroup.invalid && type === 'submit') return;

		const params: IEditWorkTimeRequest = {
			workTimeId: employee.workTimeId ?? '',
			body: [
				{
					op: 'replace',
					path: '/ManagerHours',
					value: type === 'submit' ? Number(this.hoursGroup.get(`hours_${employee.id}`)?.value ?? 0) : undefined
				}
			]
		}

		this._timeService.editWorkTime(params).subscribe((result: OperationResultResponse) => {
			if (result.status === OperationResultStatusType.FullSuccess) {
				employee.managerHours = type === 'submit' ? Number(this.hoursGroup.get(`hours_${employee.id}`)?.value ?? 0) : null;
				this.toggleEditMode(false, employee)

				this._cdr.markForCheck();
			}
		})
	}

	private _getEmployees(): Observable<EmployeeInformation[]> {
		const params: IFindStatRequest = {
			projectId: this.projectId,
			month: Number(this.selectedPeriod.startDate?.getMonth()) + 1,
			year: Number(this.selectedPeriod.startDate?.getFullYear()),
			takeCount: this.pageSize,
			skipCount: this.pageIndex * this.pageSize
		}

		return this._timeService
			.findStat(params)
			.pipe(
				map((result) => {
					return result.body?.map(statInfo => this._mapStatInfo(statInfo)) ?? [];
				}))
	}

	private _mapStatInfo(statInfo: StatInfo): EmployeeInformation {
		const employeeInfo: EmployeeInformation = {
			workTimeId: statInfo.workTimes?.[0] ? statInfo.workTimes?.[0].id : undefined,
			id: statInfo.user?.id,
			editMode: false,
			firstName: statInfo.user?.firstName,
			lastName: statInfo.user?.lastName,
			middleName: statInfo.user?.middleName,
			projectHours: statInfo.workTimes?.[0] ? statInfo.workTimes[0].userHours : 0,
			managerHours: statInfo.workTimes?.[0] ? statInfo.workTimes[0].managerHours : 0,
			leaves: statInfo.leaveTimes ?? [],
			position: '-',
			projectsCount: 0,
			normHours: statInfo.limitInfo?.normHours
		}

		return employeeInfo;
	}

	private _setDatePeriod(startDate: Date): DatePeriod {
		const datePeriod: DatePeriod = {
			startDate,
			endDate: new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0)
		}

		return datePeriod;
	}
}
