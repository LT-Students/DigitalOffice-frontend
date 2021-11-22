import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

import { AttendanceService } from '@app/services/attendance.service';
import { DateService } from '@app/services/date.service';
import { IEditWorkTimeRequest } from '@app/services/time/time.service';
import { finalize, map, switchMap, tap } from 'rxjs/operators';
import { OperationResultResponse, WorkTimeInfo } from '@data/api/time-service/models';
import { MAT_DATE_FORMATS, MatOptionSelectionChange } from '@angular/material/core';
import { DateTime } from 'luxon';
import { RANGE_DATE_FORMAT } from '@app/configs/date-formats';
import { ResponseMessageModel } from '@app/models/response/response-message.model';
import { MessageMethod, MessageTriggeredFrom } from '@app/models/response/response-message';
import { timeValidator } from './add-hours.validators';

@Component({
	selector: 'do-add-hours',
	templateUrl: './add-hours.component.html',
	styleUrls: ['./add-hours.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [{ provide: MAT_DATE_FORMATS, useValue: RANGE_DATE_FORMAT }],
})
export class AddHoursComponent implements OnDestroy {
	public workTimes$: Observable<Array<WorkTimeInfo | undefined> | undefined>;
	public selectedDate$: Observable<DateTime>;

	public addHoursForm: FormGroup;
	public isProjectForm: boolean;
	public monthOptions: DateTime[];
	private _canEditSubscription: Subscription;

	public loading$$: BehaviorSubject<boolean>;

	constructor(
		private _fb: FormBuilder,
		private _attendanceService: AttendanceService,
		private _dateService: DateService,
		private _responseService: ResponseMessageModel
	) {
		this.loading$$ = new BehaviorSubject<boolean>(false);

		this.isProjectForm = true;
		this.monthOptions = [];

		this.addHoursForm = this._fb.group({
			time: [
				'',
				[Validators.required, Validators.min(1), timeValidator(() => this._attendanceService.countMaxHours())],
			],
			activity: [null, Validators.required],
			comment: [null],
		});

		//this.recommendedTime = new BehaviorSubject<number>(0);
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

	public changeDate(date: DateTime): void {
		this._attendanceService.setNewDate(date);
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

	public toggleFormType(isProjectForm: boolean): void {
		this.isProjectForm = isProjectForm;
		//this.recommendedTime.next(0);
		const validators = isProjectForm
			? [Validators.required, Validators.min(1), timeValidator(() => this._attendanceService.countMaxHours())]
			: [];
		this.addHoursForm.get('time')?.setValidators(validators);
		this.addHoursForm.get('time')?.updateValueAndValidity();
		this.addHoursForm.reset();
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

	private _editWorkTime(): Observable<OperationResultResponse> {
		const workTimeRequest: IEditWorkTimeRequest = {
			workTimeId: this.addHoursForm.get('activity')?.value,
			body: [
				// { op: 'replace', path: '/UserHours', value: this.addHoursForm.get('time')?.value },
				{ op: 'replace', path: '/Hours', value: this.addHoursForm.get('time')?.value },
				{ op: 'replace', path: '/Description', value: this.addHoursForm.get('comment')?.value },
			],
		};

		return this._attendanceService.editWorkTime(workTimeRequest);
	}

	public ngOnDestroy(): void {
		this._canEditSubscription.unsubscribe();
	}
}
