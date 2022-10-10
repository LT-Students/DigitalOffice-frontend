import { DateTime } from 'luxon';
import { FormBuilder, FormControl } from '@angular/forms';
import { LeaveTypeModel } from '@app/models/time/leave-type.model';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { finalize, first, mapTo, switchMap, tap } from 'rxjs/operators';
import { DoValidators } from '@app/validators/do-validators';
import { LoadingState } from '@app/utils/loading-state';
import {
	AttendanceService,
	LAST_DAY_TO_FILL_HOURS,
	MAX_FUTURE_DATE,
	SubmitLeaveTimeValue,
} from '../../../services/attendance.service';

export class AddEditLeaveHoursBase extends LoadingState {
	public readonly minDate = this.getMinDate();
	public readonly maxDate = MAX_FUTURE_DATE;

	public form = this.fb.group({
		leaveType: [null, [DoValidators.required]],
		startTime: [null, [DoValidators.required]],
		endTime: [null, [DoValidators.required]],
		comment: [null],
	});
	public leaveTypes = LeaveTypeModel.getAllLeaveTypes();

	public disableReservedDays = this.attendanceService.disableReservedDays;
	public dateClass = this.attendanceService.colorWeekends;

	public selectedIntervalDurationInHours$ = new BehaviorSubject(0);

	constructor(private fb: FormBuilder, protected attendanceService: AttendanceService) {
		super();
	}

	public handleDateSelection(): void {
		const startTimeValue: DateTime = this.form.get('startTime')?.value;
		const endTimeControl = this.form.get('endTime') as FormControl;
		const endTimeValue: DateTime = this.form.get('startTime')?.value;
		if (!startTimeValue) return;
		if (!endTimeValue) {
			endTimeControl.setValue(startTimeValue.endOf('day'));
		}
		if (endTimeValue > startTimeValue) {
			return;
		}
		const duration = this.attendanceService.getLeaveDuration(startTimeValue, endTimeValue);
		this.selectedIntervalDurationInHours$.next(duration);
	}

	public submit$(initialValue?: Required<SubmitLeaveTimeValue>): Observable<boolean> {
		if (this.form.invalid) {
			this.form.markAllAsTouched();
			return of(false);
		}

		this.setLoading(true);
		return this.selectedIntervalDurationInHours$.pipe(
			first(),
			switchMap((durationHours: number) => {
				const submitValue: SubmitLeaveTimeValue = {
					...this.form.getRawValue(),
					minutes: durationHours * 60,
				};
				const offset = submitValue.startTime.offset;
				submitValue.startTime = submitValue.startTime.toUTC().plus({ minute: offset });
				submitValue.endTime = submitValue.endTime.toUTC().plus({ minute: offset });
				return this.attendanceService.submitLeaveTime(submitValue, initialValue);
			}),
			tap(this.resetForm.bind(this)),
			mapTo(true),
			finalize(() => this.setLoading(false))
		);
	}

	private getMinDate(): DateTime {
		const date = DateTime.now();
		return (date.day <= LAST_DAY_TO_FILL_HOURS ? date.minus({ month: 1 }) : date).startOf('month');
	}

	private resetForm(): void {
		this.form.reset();
		this.selectedIntervalDurationInHours$.next(0);
	}
}
