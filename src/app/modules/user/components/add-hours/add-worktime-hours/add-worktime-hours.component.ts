import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { WorkTimeInfo } from '@data/api/time-service/models/work-time-info';
import { DateTime } from 'luxon';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize, map, switchMap, tap } from 'rxjs/operators';
import { AttendanceService } from '@app/services/attendance.service';
import { MessageMethod, MessageTriggeredFrom } from '@app/models/response/response-message';
import { MatOptionSelectionChange } from '@angular/material/core';
import { OperationResultResponse } from '@data/api/time-service/models/operation-result-response';
import { IEditWorkTimeRequest } from '@app/services/time/time.service';
import { ResponseMessageModel } from '@app/models/response/response-message.model';
import { timeValidator } from '../add-hours.validators';

@Component({
	selector: 'do-add-worktime-hours',
	templateUrl: './add-worktime-hours.component.html',
	styleUrls: ['./add-worktime-hours.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddWorktimeHoursComponent implements OnDestroy {
	public loading$$: BehaviorSubject<boolean>;
	public workTimes$: Observable<Array<WorkTimeInfo | undefined> | undefined>;
	public selectedDate$: Observable<DateTime>;
	public addHoursForm: FormGroup;
	public monthOptions: DateTime[];

	private _canEditSubscription: Subscription;

	constructor(
		private _fb: FormBuilder,
		private _attendanceService: AttendanceService,
		private _responseService: ResponseMessageModel
	) {
		this.loading$$ = new BehaviorSubject<boolean>(false);
		this.monthOptions = [];
		this.addHoursForm = this._fb.group({
			time: [
				'',
				[Validators.required, Validators.min(1), timeValidator(() => this._attendanceService.countMaxHours())],
			],
			activity: [null, Validators.required],
			comment: [null],
		});
		this.workTimes$ = this._attendanceService.activities$.pipe(map((activities) => activities.projects));
		this.selectedDate$ = this._attendanceService.selectedDate$.pipe(
			tap((date) => {
				this.monthOptions = this._setMonthOptions(date);
			})
		);
		this._canEditSubscription = this._attendanceService.canEdit$.subscribe({
			next: (canEdit) => {
				if (canEdit) {
					this.addHoursForm.enable();
				} else {
					this.addHoursForm.disable();
				}
			},
		});
	}

	public ngOnDestroy(): void {
		this._canEditSubscription.unsubscribe();
	}

	public changeDate(date: DateTime): void {
		this._attendanceService.setNewDate(date);
	}

	public onSubmit(): void {
		this.loading$$.next(true);

		this._editWorkTime()
			.pipe(
				switchMap(() => this._attendanceService.getActivities()),
				this._responseService.message(MessageTriggeredFrom.WorkTime, MessageMethod.Create),
				finalize(() => {
					this.loading$$.next(false);
				})
			)
			.subscribe(() => {
				this.addHoursForm.reset();
			});
	}

	public patchWorkTimeInfoIntoForm(workTime: WorkTimeInfo | undefined, event: MatOptionSelectionChange): void {
		if (event.isUserInput && workTime) {
			if (this.addHoursForm.get('time')?.value !== '') {
				this.addHoursForm.patchValue({
					comment: workTime.description,
				});
			} else {
				this.addHoursForm.patchValue({
					time: workTime.userHours,
					comment: workTime.description,
				});
			}
		}
	}

	private _editWorkTime(): Observable<OperationResultResponse> {
		const workTimeRequest: IEditWorkTimeRequest = {
			workTimeId: this.addHoursForm.get('activity')?.value,
			body: [
				{ op: 'replace', path: '/Hours', value: this.addHoursForm.get('time')?.value },
				{ op: 'replace', path: '/Description', value: this.addHoursForm.get('comment')?.value },
			],
		};

		return this._attendanceService.editWorkTime(workTimeRequest);
	}

	private _setMonthOptions(selectedDate: DateTime): DateTime[] {
		if (selectedDate.day < 5 && selectedDate.month === DateTime.now().month) {
			const currentDate = DateTime.now();
			return [currentDate, currentDate.minus({ months: 1 })];
		} else if (selectedDate.month < DateTime.now().month || selectedDate.year !== DateTime.now().year) {
			return [DateTime.now()];
		}
		return [];
	}
}
