import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DateTime } from 'luxon';
import { BehaviorSubject, Observable } from 'rxjs';
import { DatePeriod } from '@app/types/date-period';
import { LeaveTypeModel } from '@app/models/time/leave-type.model';
import { finalize, first, switchMap } from 'rxjs/operators';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { RANGE_DATE_FORMAT } from '@app/configs/date-formats';
import { OperationResultResponse } from '@app/types/operation-result-response.interface';
import { LoadingState } from '@shared/directives/button-loading.directive';
import { LeaveType } from '@api/time-service/models/leave-type';
import { AttendanceService } from '../../../services/attendance.service';

export interface AddLeaveValue {
	leaveType: LeaveType;
	startDate: DateTime;
	endDate: DateTime;
	minutes: number;
	comment: string | null;
}

@Component({
	selector: 'do-add-leave-hours',
	templateUrl: './add-leave-hours.component.html',
	styleUrls: ['./add-leave-hours.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [{ provide: MAT_DATE_FORMATS, useValue: RANGE_DATE_FORMAT }],
})
export class AddLeaveHoursComponent extends LoadingState implements OnInit {
	public readonly minDate = DateTime.now().startOf('month');

	public addLeaveForm = this.fb.group({
		leaveType: [null, [Validators.required]],
		startDate: [null, [Validators.required]],
		endDate: [null, [Validators.required]],
		comment: [null],
	});
	public leaveTypes = LeaveTypeModel.getAllLeaveTypes();

	public disableWeekends = this.attendanceService.disableWeekends;
	public dateClass = this.attendanceService.colorWeekends;

	public selectedIntervalDurationInHours$ = new BehaviorSubject(0);

	constructor(private fb: FormBuilder, private attendanceService: AttendanceService) {
		super();
	}

	public ngOnInit(): void {}

	public onClose(): void {
		const startDateValue: DateTime = this.addLeaveForm.get('startDate')?.value;
		const endDateControl = this.addLeaveForm.get('endDate');
		if (!startDateValue) return;
		if (!endDateControl?.value) {
			endDateControl?.setValue(startDateValue.endOf('day'));
		}
		const datePeriod: DatePeriod = {
			startDate: startDateValue,
			endDate: endDateControl?.value,
		};
		this.attendanceService.getLeaveDuration(datePeriod).subscribe({
			next: (leaveDuration: number) => this.selectedIntervalDurationInHours$.next(leaveDuration),
		});
	}

	public onSubmit(): void {
		if (this.addLeaveForm.invalid) {
			this.addLeaveForm.markAllAsTouched();
			return;
		}

		this.setLoading(true);
		this.addLeaveTime()
			.pipe(finalize(() => this.setLoading(false)))
			.subscribe({ next: this.resetForm.bind(this) });
	}

	private resetForm(): void {
		this.addLeaveForm.reset();
		this.selectedIntervalDurationInHours$.next(0);
	}

	private addLeaveTime(): Observable<OperationResultResponse> {
		return this.selectedIntervalDurationInHours$.pipe(
			first(),
			switchMap((hours: number) => {
				const leaveValue: AddLeaveValue = { ...this.addLeaveForm.getRawValue(), minutes: hours * 60 };
				return this.attendanceService.addLeaveTime(leaveValue);
			})
		);
	}
}
