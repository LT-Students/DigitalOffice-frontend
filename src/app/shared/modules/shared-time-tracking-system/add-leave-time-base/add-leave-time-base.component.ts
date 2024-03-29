import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { BehaviorSubject, EMPTY, Observable } from 'rxjs';
import { finalize, first, map, switchMap } from 'rxjs/operators';
import { DateTime } from 'luxon';
import { LeaveType } from '@api/time-service/models/leave-type';
import { RANGE_DATE_FORMAT } from '@app/configs/date-formats';
import { DoValidators } from '@app/validators/do-validators';
import { LeaveTypeModel } from '@app/models/time/leave-type.model';
import { LoadingState } from '@app/utils/loading-state';
import {
	SubmitLeaveTimeValue,
	MAX_FUTURE_DATE_FOR_LEAVE_TIME,
	LeaveTimeAndDatepickerManagement,
	CreateLeaveTime,
} from '@shared/modules/shared-time-tracking-system/models';
import { getMinDateToFillHours } from '@shared/modules/shared-time-tracking-system/utils/utils';

@Component({
	selector: 'do-add-leave-time-base',
	templateUrl: './add-leave-time-base.component.html',
	styleUrls: ['./add-leave-time-base.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [{ provide: MAT_DATE_FORMATS, useValue: RANGE_DATE_FORMAT }],
})
export class AddLeaveTimeBaseComponent {
	@Input() hideLeaveTypeSelect = false;

	public readonly minDate = getMinDateToFillHours();
	public readonly maxDate = MAX_FUTURE_DATE_FOR_LEAVE_TIME;

	public form = this.fb.group({
		leaveType: this.fb.control<LeaveType | null>(null, [DoValidators.required]),
		startTime: this.fb.control<DateTime | null>(null, [DoValidators.required]),
		endTime: this.fb.control<DateTime | null>(null, [DoValidators.required]),
		comment: [''],
	});
	public leaveTypes = LeaveTypeModel.getAllLeaveTypes();

	public disableReservedDays = this.leaveTimeDatepicker.disableReservedDays;
	public dateClass = this.leaveTimeDatepicker.colorWeekends;

	public selectedIntervalDurationInHours$ = new BehaviorSubject(0);

	public loadingState = new LoadingState();

	constructor(
		private fb: FormBuilder,
		private leaveTimeDatepicker: LeaveTimeAndDatepickerManagement,
		private createLeaveTimeService: CreateLeaveTime,
		private cdr: ChangeDetectorRef
	) {}

	public handleDateSelection(): void {
		const endTimeControl = this.form.controls.endTime;
		const { startTime, endTime } = this.form.value;
		if (!startTime) return;
		if (!endTime) {
			endTimeControl.setValue(startTime.endOf('day'));
		}
		const definitelyAssignedEndTime = this.form.value.endTime as DateTime;
		if (startTime > definitelyAssignedEndTime) {
			return;
		}
		const duration = this.leaveTimeDatepicker.getLeaveDuration(startTime, definitelyAssignedEndTime);
		this.selectedIntervalDurationInHours$.next(duration);
	}

	public submit$(initialValue?: Required<SubmitLeaveTimeValue>): Observable<Required<SubmitLeaveTimeValue>> {
		if (this.form.invalid) {
			this.form.markAllAsTouched();
			// when calling this method from parent component it seems that ChangeDetection isn't triggered so inputs
			// are not highlighting with error
			this.cdr.markForCheck();
			return EMPTY;
		}

		this.loadingState.setLoading(true);
		return this.selectedIntervalDurationInHours$.pipe(
			first(),
			switchMap((durationHours: number) => {
				const submitValue = {
					...(this.form.value as SubmitLeaveTimeValue),
					minutes: durationHours * 60,
				};
				const offset = submitValue.startTime.offset;
				submitValue.startTime = submitValue.startTime.toUTC().plus({ minute: offset });
				submitValue.endTime = submitValue.endTime.toUTC().plus({ minute: offset });
				return this.createLeaveTimeService.createLeaveTime(submitValue, initialValue).pipe(
					map((leaveTimeId: string) => ({
						...submitValue,
						leaveTimeId,
					}))
				);
			}),
			finalize(() => this.loadingState.setLoading(false))
		);
	}

	public resetForm(): void {
		this.form.reset();
		this.selectedIntervalDurationInHours$.next(0);
	}
}
