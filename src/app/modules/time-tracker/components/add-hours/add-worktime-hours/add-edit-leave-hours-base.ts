import { DateTime } from 'luxon';
import { FormBuilder, Validators } from '@angular/forms';
import { LeaveTypeModel } from '@app/models/time/leave-type.model';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { DatePeriod } from '@app/types/date-period';
import { finalize, first, mapTo, switchMap, tap } from 'rxjs/operators';
import { LoadingState } from '@shared/directives/button-loading.directive';
import { AttendanceService, SubmitLeaveTimeValue } from '../../../services/attendance.service';

export class AddEditLeaveHoursBase extends LoadingState {
	public readonly minDate = DateTime.now().startOf('month');

	public form = this.fb.group({
		leaveType: [null, [Validators.required]],
		startTime: [null, [Validators.required]],
		endTime: [null, [Validators.required]],
		comment: [null],
	});
	public leaveTypes = LeaveTypeModel.getAllLeaveTypes();

	public disableReservedDays = this.attendanceService.disableReservedDays;
	public dateClass = this.attendanceService.colorWeekends;

	public selectedIntervalDurationInHours$ = new BehaviorSubject(0);

	constructor(private fb: FormBuilder, private attendanceService: AttendanceService) {
		super();
	}

	public handleDateSelection(): void {
		const startTimeValue: DateTime = this.form.get('startTime')?.value;
		const endTimeControl = this.form.get('endTime');
		if (!startTimeValue) return;
		if (!endTimeControl?.value) {
			endTimeControl?.setValue(startTimeValue.endOf('day'));
		}
		const datePeriod: DatePeriod = {
			startDate: startTimeValue,
			endDate: endTimeControl?.value,
		};
		this.attendanceService.getLeaveDuration(datePeriod, this.disableReservedDays).subscribe({
			next: (leaveDuration: number) => this.selectedIntervalDurationInHours$.next(leaveDuration),
		});
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
				return this.attendanceService.submitLeaveTime(submitValue, initialValue);
			}),
			tap(this.resetForm.bind(this)),
			mapTo(true),
			finalize(() => this.setLoading(false))
		);
	}

	private resetForm(): void {
		this.form.reset();
		this.selectedIntervalDurationInHours$.next(0);
	}
}
