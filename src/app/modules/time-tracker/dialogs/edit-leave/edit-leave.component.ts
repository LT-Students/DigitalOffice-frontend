import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TimeService } from '@app/services/time/time.service';
import { DateFilterFn } from '@angular/material/datepicker';
import { DatePeriod } from '@app/types/date-period';
import { LeaveTimePath, InitialDataEditRequest } from '@app/types/edit-request';
import { DateTime, Interval } from 'luxon';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { RANGE_DATE_FORMAT } from '@app/configs/date-formats';
import { createEditRequest } from '@app/utils/utils';
import { BehaviorSubject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LeaveTime } from '../../models/leave-time';
import { AttendanceService } from '../../services/attendance.service';
import { IDialogResponse } from '../../components/user-tasks/user-tasks.component';

@Component({
	selector: 'do-edit-leave',
	templateUrl: './edit-leave.component.html',
	styleUrls: ['./edit-leave.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [{ provide: MAT_DATE_FORMATS, useValue: RANGE_DATE_FORMAT }],
})
export class EditLeaveComponent {
	public LeaveTimePath = LeaveTimePath;

	public editForm: FormGroup;
	public formHasChanged: boolean;
	public periodInHours: number;
	public disableWeekends: DateFilterFn<DateTime>;
	private readonly _initialData: InitialDataEditRequest<LeaveTimePath>;
	public loading$$: BehaviorSubject<boolean>;

	constructor(
		@Inject(MAT_DIALOG_DATA) public leave: LeaveTime,
		private _fb: FormBuilder,
		private _dialogRef: MatDialogRef<EditLeaveComponent, IDialogResponse>,
		private _timeService: TimeService,
		private _attendanceService: AttendanceService
	) {
		this.loading$$ = new BehaviorSubject<boolean>(false);
		const timeZoneOffset = DateTime.fromISO(leave.startTime).offset;
		const currentInterval = Interval.fromDateTimes(
			DateTime.fromISO(this.leave.startTime),
			DateTime.fromISO(this.leave.endTime).plus({ minutes: timeZoneOffset })
		);

		this._initialData = {
			[LeaveTimePath.COMMENT]: [this.leave.comment],
			[LeaveTimePath.START_TIME]: [DateTime.fromISO(this.leave.startTime), [Validators.required]],
			[LeaveTimePath.END_TIME]: [DateTime.fromISO(this.leave.endTime), [Validators.required]],
			[LeaveTimePath.MINUTES]: [this.leave.minutes],
		};
		this.formHasChanged = false;
		this.editForm = this._fb.group(this._initialData);
		this._onCreateGroupFormValueChange();
		this.periodInHours = leave.hours;
		this._attendanceService.removeInterval(currentInterval);
		this.disableWeekends = this._attendanceService.disableWeekends;
	}

	private _onCreateGroupFormValueChange() {
		const initialComment = this.editForm.get(LeaveTimePath.COMMENT)?.value;
		const initialStartTime: DateTime = this.editForm.get(LeaveTimePath.START_TIME)?.value;
		const initialEndTime: DateTime = this.editForm.get(LeaveTimePath.END_TIME)?.value;

		this.editForm.valueChanges.subscribe((value) => {
			this.formHasChanged =
				initialComment !== value[LeaveTimePath.COMMENT] ||
				+initialStartTime !== +value[LeaveTimePath.START_TIME] ||
				+initialEndTime !== +value[LeaveTimePath.END_TIME];
		});
	}

	public dateSelected(): void {
		const startDateControl = this.editForm.get('/StartTime');
		const endDateControl = this.editForm.get('/EndTime');
		const startDateValue: DateTime = startDateControl?.value;
		let endDateValue: DateTime = endDateControl?.value;

		const timeZoneOffset = startDateValue?.offset;

		if (!startDateValue.isValid || !endDateValue.isValid || +endDateValue === 0) return;

		if (+startDateValue === +endDateValue) {
			endDateValue = startDateValue.endOf('day').minus({ minutes: timeZoneOffset });
		}

		startDateControl?.setValue(startDateValue);
		endDateControl?.setValue(endDateValue);

		const datePeriod: DatePeriod = {
			startDate: startDateValue,
			endDate: endDateValue,
		};

		// this.periodInHours = this._attendanceService.getLeaveDuration(datePeriod);
		this.editForm.get('/Minutes')?.setValue(this.periodInHours * 60);
	}

	public onClose(params?: IDialogResponse): void {
		this._dialogRef.close(params);
	}

	public onSubmitClick(): void {
		this.loading$$.next(true);
		const editRequest = createEditRequest(this.editForm.getRawValue(), this._initialData);
		this._timeService
			.editLeaveTime({
				leaveTimeId: this.leave.id,
				body: editRequest,
			})
			.pipe(finalize(() => this.loading$$.next(false)))
			.subscribe(
				(res) => {
					this.onClose({
						status: res.status,
						data: {
							startTime: this.editForm.get('/StartTime')?.value,
							endTime: this.editForm.get('/EndTime')?.value,
							minutes: this.editForm.get('/Minutes')?.value,
							comment: this.editForm.get('/Comment')?.value,
						},
					});
				},
				() => this._attendanceService.getMonthActivities().subscribe()
			);
	}
}
