import { Component, ChangeDetectionStrategy, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, iif, Observable, of, Subject, Subscription } from 'rxjs';
import { WorkTimeInfo } from '@api/time-service/models/work-time-info';
import { DateTime } from 'luxon';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { MatOptionSelectionChange } from '@angular/material/core';
import { OperationResultResponse } from '@api/time-service/models/operation-result-response';
import { IEditWorkTimeRequest } from '@app/services/time/time.service';
import { ResponseMessageModel } from '@app/models/response/response-message.model';
import { CreateWorkTimeRequest } from '@api/time-service/models/create-work-time-request';
import { DoValidators } from '@app/validators/do-validators';
import { AttendanceService } from '../../../services/attendance.service';

@Component({
	selector: 'do-add-worktime-hours',
	templateUrl: './add-worktime-hours.component.html',
	styleUrls: ['./add-worktime-hours.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddWorktimeHoursComponent implements OnInit, OnDestroy {
	public loading$$: BehaviorSubject<boolean>;
	public workTimes$: Observable<WorkTimeInfo[]>;
	public selectedDate: DateTime;
	public addHoursForm: FormGroup;
	public monthOptions: DateTime[];
	public isAnotherExist: boolean;
	public monthNorm: number;
	public dateControl = new FormControl(DateTime.now());
	private destroy$ = new Subject();
	private readonly DAYS_FROM_LASTMONTH: number = 5;

	constructor(
		private _fb: FormBuilder,
		private _attendanceService: AttendanceService,
		private _responseService: ResponseMessageModel
	) {
		this.isAnotherExist = false;
		this.selectedDate = DateTime.now();
		this.loading$$ = new BehaviorSubject<boolean>(false);
		this.monthOptions = [];
		this.monthNorm = 160;

		this.workTimes$ = this._attendanceService.activities$.pipe(
			map((activities) => activities.projects ?? []),
			tap((projects) => this._checkIfAnotherExist(projects)),
			switchMap((projects) => {
				return iif(
					() => this.isAnotherExist,
					of(projects),
					of([{ id: 'another', project: { name: undefined } } as WorkTimeInfo, ...projects])
				);
			})
		);

		this._attendanceService.monthNorm$.subscribe({
			next: (monthNorm) => (this.monthNorm = monthNorm),
		});

		this.addHoursForm = this._fb.group({
			time: ['', [Validators.required, Validators.min(0), Validators.max(this.monthNorm), DoValidators.intNum]],
			activity: [null, Validators.required],
			comment: [null],
		});

		this._attendanceService.canEdit$.pipe(takeUntil(this.destroy$)).subscribe({
			next: (canEdit) => {
				if (canEdit) {
					this.addHoursForm.enable();
				} else {
					this.addHoursForm.disable();
				}
			},
		});
	}

	public ngOnInit() {
		this.dateControl.valueChanges
			.pipe(takeUntil(this.destroy$))
			.subscribe((date: DateTime) => this.changeDate(date));

		this._attendanceService.selectedDate$
			.pipe(
				tap((date) => {
					this.selectedDate = date;
					if (!this.compareDate(date, this.dateControl.value)) {
						this.dateControl.setValue(date, { emitEvent: false });
					}
					this.monthOptions = this._setMonthOptions(date);
				}),
				takeUntil(this.destroy$)
			)
			.subscribe();
	}

	public compareDate(d1: DateTime, d2: DateTime): boolean {
		return d1.year === d2.year && d1.month === d2.month;
	}

	public ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}

	public changeDate(date: DateTime): void {
		this._attendanceService.setNewDate(date);
	}

	public onSubmit(): void {
		this.loading$$.next(true);

		const createWorkTimeRequest: CreateWorkTimeRequest = {
			hours: this.addHoursForm.get('time')?.value ?? 0,
			year: this.selectedDate.year,
			month: this.selectedDate.month,
			description: this.addHoursForm.get('comment')?.value ?? '',
			offset: DateTime.now().offset / 60,
		};

		const action = !this.isAnotherExist
			? this._attendanceService.createWorkTime(createWorkTimeRequest)
			: this._editWorkTime();

		action
			.pipe(
				switchMap(() => this._attendanceService.getActivities()),
				finalize(() => {
					this.loading$$.next(false);
				})
			)
			.subscribe(() => {
				this.addHoursForm.reset();
			});
	}

	public patchWorkTimeInfoIntoForm(workTime: WorkTimeInfo, event: MatOptionSelectionChange): void {
		const isWorkTimeProjectIdEmpty: boolean = this._isGUIDEmpty(workTime?.project?.id ?? '');

		if (event.isUserInput) {
			this.addHoursForm.get('comment')?.clearValidators();
			if (isWorkTimeProjectIdEmpty || workTime.id === 'another') {
				this.addHoursForm.get('comment')?.addValidators(Validators.required);
				this.addHoursForm.get('comment')?.updateValueAndValidity();
			}
			if (this.addHoursForm.get('time')?.value === '') {
				this.addHoursForm.patchValue({
					time: workTime.userHours,
				});
			}
			if (this.addHoursForm.get('comment')?.value !== '') {
				this.addHoursForm.patchValue({
					comment: workTime.description,
				});
			}
		}
	}

	private _checkIfAnotherExist(projects: WorkTimeInfo[]): void {
		this.isAnotherExist = !!projects.find((value) => this._isGUIDEmpty(value.project?.id ?? ''));
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
		if (
			selectedDate.day <= this.DAYS_FROM_LASTMONTH &&
			selectedDate.month === DateTime.now().month &&
			selectedDate.year === DateTime.now().year
		) {
			const currentDate = DateTime.now();
			return [currentDate, currentDate.minus({ months: 1 })];
		} else if (selectedDate.month === DateTime.now().month) {
			return [DateTime.now()];
		} else if (selectedDate.month !== DateTime.now().month || selectedDate.year !== DateTime.now().year) {
			return [selectedDate, DateTime.now()];
		}
		return [];
	}

	private _isGUIDEmpty(id: string): boolean {
		return id === '00000000-0000-0000-0000-000000000000';
	}
}
