import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { BehaviorSubject, iif, Observable, of, Subscription } from 'rxjs';
import { WorkTimeInfo } from '@data/api/time-service/models/work-time-info';
import { DateTime } from 'luxon';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { finalize, map, switchMap, tap } from 'rxjs/operators';
import { AttendanceService } from '@app/services/attendance.service';
import { MatOptionSelectionChange } from '@angular/material/core';
import { OperationResultResponse } from '@data/api/time-service/models/operation-result-response';
import { IEditWorkTimeRequest } from '@app/services/time/time.service';
import { ResponseMessageModel } from '@app/models/response/response-message.model';
import { CreateWorkTimeRequest } from '@data/api/time-service/models/create-work-time-request';
import { DoValidators } from '@app/validators/do-validators';
import { ITooltip } from '../add-leave-hours/add-leave-hours.component';

@Component({
	selector: 'do-add-worktime-hours',
	templateUrl: './add-worktime-hours.component.html',
	styleUrls: ['./add-worktime-hours.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddWorktimeHoursComponent implements OnDestroy {
	public loading$$: BehaviorSubject<boolean>;
	public workTimes$: Observable<WorkTimeInfo[]>;
	public selectedDate: DateTime;
	public selectedDate$: Observable<DateTime>;
	public addHoursForm: FormGroup;
	public monthOptions: DateTime[];
	public isAnotherExist: boolean;
	public tooltip: ITooltip;
	public monthNorm: number;

	private _canEditSubscription: Subscription;

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
		this.selectedDate$ = this._attendanceService.selectedDate$.pipe(
			tap((date) => {
				this.selectedDate = date;
				this.monthOptions = this._setMonthOptions(date);
			})
		);

		this._attendanceService.monthNorm$.subscribe({
			next: (monthNorm) => (this.monthNorm = monthNorm),
		});
		this.tooltip = { disabled: true, message: '' };

		this.addHoursForm = this._fb.group({
			time: ['', [Validators.required, Validators.min(0), Validators.max(this.monthNorm), DoValidators.intNum]],
			activity: [null, Validators.required],
			comment: [null],
		});
		this.addHoursForm.get('time')?.valueChanges.subscribe(() => {
			this.makeTooltipMessage();
		});
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

		const createWorkTimeRequest: CreateWorkTimeRequest = {
			hours: this.addHoursForm.get('time')?.value ?? 0,
			year: this.selectedDate.year,
			month: this.selectedDate.month,
			description: this.addHoursForm.get('comment')?.value ?? '',
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
		if (selectedDate.day < 5 && selectedDate.month === DateTime.now().month) {
			const currentDate = DateTime.now();
			return [currentDate, currentDate.minus({ months: 1 })];
		} else if (selectedDate.month < DateTime.now().month || selectedDate.year !== DateTime.now().year) {
			return [DateTime.now()];
		}
		return [];
	}

	public makeTooltipMessage(): void {
		this.tooltip = { disabled: true, message: '' };
		const errors: ValidationErrors | null = this.addHoursForm.controls['time'].errors;
		if (errors?.required) {
			this.tooltip = { disabled: false, message: 'Поле обязательно' };
			return;
		}
		if (errors?.max) {
			this.tooltip = {
				disabled: false,
				message: `В этом месяце можно поставить не больше ${this.monthNorm} часов`,
			};
			return;
		}
		if (errors?.min) {
			this.tooltip = { disabled: false, message: 'Минимальное значение - 0' };
			return;
		}
		if (errors?.intNum) {
			this.tooltip = { disabled: false, message: 'Допустим ввод только целых чисел' };
			return;
		}
	}

	private _isGUIDEmpty(id: string): boolean {
		return id === '00000000-0000-0000-0000-000000000000';
	}
}
