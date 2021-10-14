import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

import { TimeDurationService } from '@app/services/time-duration.service';
import { IEditWorkTimeRequest, IFindStatRequest, IGetImport, TimeService } from '@app/services/time/time.service';
import {
	FindResultResponseStatInfo,
	LeaveTimeInfo,
	OperationResultResponse,
	OperationResultStatusType,
	StatInfo,
	UserInfo,
	WorkTimeInfo,
	WorkTimeMonthLimitInfo,
} from '@data/api/time-service/models';
import { DatePeriod } from '@app/types/date-period';
import { DoValidators } from '@app/validators/do-validators';
import { DateTime } from 'luxon';

interface EditableWorkTime extends WorkTimeInfo {
	editMode: boolean;
}

interface IconedLeaveTimeInfo extends LeaveTimeInfo {
	periodInHours: number;
}

interface MappedStatInfo {
	totalHours: number;
	leaveTimes?: IconedLeaveTimeInfo[];
	limitInfo?: WorkTimeMonthLimitInfo;
	user?: UserInfo;
	workTimes?: Array<EditableWorkTime>;
}

@Component({
	selector: 'do-directors-timelist',
	templateUrl: './directors-timelist.component.html',
	styleUrls: ['./directors-timelist.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DirectorsTimelistComponent implements OnInit {
	public hoursGroup: FormGroup;

	private _departmentId: string | undefined;

	public statInfo$: Observable<MappedStatInfo[] | undefined> | undefined;

	public selectedPeriod: DatePeriod;

	public pageSize: number;
	public pageIndex: number;
	public totalCount: number;
	public employeeCountMap: { [k: string]: string };

	constructor(
		private _cdr: ChangeDetectorRef,
		private _formBuilder: FormBuilder,
		private _timeDurationService: TimeDurationService,
		private _timeService: TimeService,
		private _route: ActivatedRoute
	) {
		this.selectedPeriod = this._setDatePeriod(DateTime.now());
		this.hoursGroup = this._formBuilder.group({});
		this.pageSize = 20;
		this.pageIndex = 0;
		this.totalCount = 0;

		this.employeeCountMap = {
			one: '# сотрудник',
			few: '# сотрудника',
			other: '# сотрудников',
		};
	}

	ngOnInit() {
		console.log('Route: ', this._route);
		this._route.params.pipe(tap((p) => (this._departmentId = p.id))).subscribe(() => {
			this.statInfo$ = this._getStat();
		});
	}

	public toggleEditMode(editMode: boolean, workTime: EditableWorkTime): void {
		workTime.editMode = editMode;
		if (editMode) {
			const year: number = this.selectedPeriod.startDate.year;
			const month: number = this.selectedPeriod.startDate.month;

			const validators: ValidatorFn[] = [
				Validators.min(0),
				Validators.max(this._timeDurationService.countMaxMonthDuration(year, month)),
				DoValidators.number,
			];

			this.hoursGroup.addControl(
				`hours_${workTime.id}`,
				this._formBuilder.control(workTime.managerHours ?? 0, validators)
			);
		} else {
			this.hoursGroup.removeControl(`hours_${workTime.id}`);
		}
	}

	public onSubmit(type: 'reset' | 'submit', workTime: EditableWorkTime, statInfo: MappedStatInfo): void {
		if (this.hoursGroup.invalid && type === 'submit') return;

		const params: IEditWorkTimeRequest = {
			workTimeId: workTime.id ?? '',
			body: [
				{
					op: 'replace',
					path: '/ManagerHours',
					value:
						type === 'submit' ? Number(this.hoursGroup.get(`hours_${workTime.id}`)?.value ?? 0) : undefined,
				},
			],
		};

		this._timeService.editWorkTime(params).subscribe((result: OperationResultResponse) => {
			if (result.status === OperationResultStatusType.FullSuccess) {
				workTime.managerHours =
					type === 'submit' ? Number(this.hoursGroup.get(`hours_${workTime?.id}`)?.value ?? 0) : null;
				statInfo.totalHours = this._getTotalHours(statInfo.workTimes ?? []);
				this.toggleEditMode(false, workTime);

				this._cdr.markForCheck();
			}
		});
	}

	public onDownload(): void {
		const queryParams: IGetImport = {
			departmentId: this._departmentId,
			month: this.selectedPeriod.startDate.month,
			year: this.selectedPeriod.startDate.year,
		};

		this._timeService.getImport(queryParams).subscribe((result) => {
			const filename = `Statistic_${queryParams.year}_${queryParams.month}`;
			const mediaType = 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,';
			const downloadLink = document.createElement('a');
			downloadLink.href = mediaType + result.body;
			downloadLink.download = filename;
			document.body.appendChild(downloadLink);
			downloadLink.click();
			downloadLink.remove();
		});
	}

	public chosenMonthHandler(date: DateTime): void {
		this.selectedPeriod = this._setDatePeriod(date);
		this.statInfo$ = this._getStat();
	}

	public onPageChange(event: PageEvent): void {
		this.pageIndex = event.pageIndex;
		this.pageSize = event.pageSize;
		this.statInfo$ = this._getStat();
	}

	private _getStat(): Observable<MappedStatInfo[]> {
		let params: IFindStatRequest = {
			month: this.selectedPeriod.startDate.month,
			year: this.selectedPeriod.startDate.year,
			takeCount: this.pageSize,
			skipCount: this.pageSize * this.pageIndex,
			departmentId: this._departmentId,
		};

		return this._timeService.findStat(params).pipe(
			tap((result: FindResultResponseStatInfo) => {
				this.totalCount = result.totalCount ?? 0;
			}),
			map(
				(result: FindResultResponseStatInfo) =>
					result.body?.map((statInfo: StatInfo) => this._mapStatInfo(statInfo)) as MappedStatInfo[]
			)
		);
	}

	private _mapStatInfo(statInfo: StatInfo): MappedStatInfo {
		return {
			...statInfo,
			totalHours: this._getTotalHours(statInfo.workTimes ?? []),
			leaveTimes: statInfo.leaveTimes?.map<IconedLeaveTimeInfo>((leaveTime) => ({
				...leaveTime,
				periodInHours: this._getPeriodInHours(leaveTime.startTime ?? '', leaveTime.endTime ?? ''),
			})),
			workTimes: statInfo.workTimes?.map<EditableWorkTime>((workTime) => ({
				...workTime,
				editMode: false,
			})),
		};
	}

	private _getTotalHours(workTimes: WorkTimeInfo[]): number {
		return workTimes
			.map((workTime) =>
				workTime.managerHours ? workTime.managerHours : workTime.userHours ? workTime.userHours : 0
			)
			.reduce((hours1, hours2) => Number(hours1) + Number(hours2), 0);
	}

	private _setDatePeriod(startDate: DateTime): DatePeriod {
		return {
			startDate,
			endDate: startDate.endOf('month'),
		};
	}

	private _getPeriodInHours(startTime: string, endTime: string): number {
		const datePeriod: DatePeriod = { startDate: DateTime.fromISO(startTime), endDate: DateTime.fromISO(endTime) };
		return this._timeDurationService.getDuration(datePeriod, 8);
	}
}
