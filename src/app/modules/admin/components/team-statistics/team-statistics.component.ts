import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { TimeDurationService } from '@app/services/time-duration.service';
import { IEditWorkTimeRequest, IFindStatRequest, TimeService } from '@app/services/time/time.service';
import { DoValidators } from '@app/validators/do-validators';
import {
	LeaveTimeInfo,
	OperationResultResponse,
	OperationResultStatusType,
	StatInfo,
	WorkTimeInfo,
} from '@data/api/time-service/models';
import { DatePeriod } from '@app/types/date-period';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DateTime } from 'luxon';

export interface EmployeeStats {
	id?: string;
	workTimeId?: string;
	editMode?: boolean;
	firstName?: string;
	lastName?: string;
	middleName?: string;
	position?: string;
	projectHours?: number | null;
	managerHours?: number | null;
	normHours?: number;
	leaves?: LeaveTimeInfo[];
	projectsCount?: number;
	modifiedAtUtc: string;
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
	public employees$: Observable<EmployeeStats[]> | undefined;

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
		this.projectId = '';
		this.selectedPeriod = this._setDatePeriod(DateTime.now());
		this.pageIndex = 0;
		this.pageSize = 20;
		this.totalCount = 0;
	}

	ngOnInit(): void {
		this.employees$ = this._getEmployees();
	}

	public chosenMonthHandler(date: DateTime): void {
		this.selectedPeriod = this._setDatePeriod(date);
		this.employees$ = this._getEmployees();
	}

	public toggleEditMode(editMode: boolean, employee: EmployeeStats): void {
		employee.editMode = editMode;

		if (editMode) {
			const year: number = this.selectedPeriod.startDate.year;
			const month: number = this.selectedPeriod.startDate.month;

			const validators: ValidatorFn[] = [
				Validators.min(0),
				Validators.max(this._timeDurationService.countMaxMonthDuration(year, month)),
				DoValidators.floatNumber,
			];

			this.hoursGroup.addControl(
				`hours_${employee.id}`,
				this._formBuilder.control(employee.managerHours ?? 0, validators)
			);
		} else {
			this.hoursGroup.removeControl(`hours_${employee.id}`);
		}
	}

	public onSubmit(type: 'submit' | 'reset', employee: EmployeeStats): void {
		if (this.hoursGroup.invalid && type === 'submit') return;

		const params: IEditWorkTimeRequest = {
			workTimeId: employee.workTimeId ?? '',
			body: [
				{
					op: 'replace',
					// path: '/ManagerHours',
					path: '/Hours',
					value:
						type === 'submit' ? Number(this.hoursGroup.get(`hours_${employee.id}`)?.value ?? 0) : undefined,
				},
			],
		};

		this._timeService.editWorkTime(params).subscribe((result: OperationResultResponse) => {
			if (result.status === OperationResultStatusType.FullSuccess) {
				employee.managerHours =
					type === 'submit' ? Number(this.hoursGroup.get(`hours_${employee.id}`)?.value ?? 0) : null;
				this.toggleEditMode(false, employee);

				this._cdr.markForCheck();
			}
		});
	}

	private _getEmployees(): Observable<EmployeeStats[]> {
		const params: IFindStatRequest = {
			projectId: this.projectId,
			month: this.selectedPeriod.startDate.month,
			year: this.selectedPeriod.startDate.year,
			takeCount: this.pageSize,
			skipCount: this.pageIndex * this.pageSize,
		};

		return this._timeService.findStat(params).pipe(
			map((result) => {
				return result.body?.map((statInfo) => this._mapStatInfo(statInfo)) ?? [];
			})
		);
	}

	private _mapStatInfo(statInfo: StatInfo): EmployeeStats {
		const workTimeInfo: WorkTimeInfo | undefined = statInfo.workTimes?.find(
			(workTime) => workTime.project?.id === this.projectId
		);

		const projectHours: number = workTimeInfo?.userHours ?? 0;
		const managerHours: number = workTimeInfo?.managerHours ?? 0;
		console.log(statInfo);

		return {
			workTimeId: workTimeInfo?.id ?? '',
			id: statInfo.user?.id,
			editMode: false,
			firstName: statInfo.user?.firstName ?? '',
			lastName: statInfo.user?.lastName ?? '',
			middleName: statInfo.user?.middleName ?? '',
			projectHours,
			managerHours,
			leaves: statInfo.leaveTimes ?? [],
			position: '-',
			projectsCount: 0,
			normHours: (statInfo.limitInfo?.normHours ?? 0) * (statInfo.user?.rate ?? 0),
			modifiedAtUtc: statInfo.workTimes?.[0].modifiedAtUtc ?? '',
		};
	}

	private _setDatePeriod(startDate: DateTime): DatePeriod {
		return {
			startDate,
			endDate: startDate.endOf('month'),
		};
	}
}
