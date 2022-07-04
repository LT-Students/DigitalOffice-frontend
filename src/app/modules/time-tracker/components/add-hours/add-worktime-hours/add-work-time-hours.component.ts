import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { DateTime } from 'luxon';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize, map, takeUntil } from 'rxjs/operators';
import { DoValidators } from '@app/validators/do-validators';
import { EMPTY_GUID, isGUIDEmpty } from '@app/utils/utils';
import { LoadingState } from '@shared/directives/button-loading.directive';
import { AttendanceService, LAST_DAY_TO_FILL_HOURS, SubmitWorkTimeValue } from '../../../services/attendance.service';
import { WorkTime } from '../../../models/work-time';

interface ProjectOption {
	id: string;
	projectId: string;
	name: string;
	workTime?: WorkTime;
}

@Component({
	selector: 'do-add-work-time-hours',
	templateUrl: './add-work-time-hours.component.html',
	styleUrls: ['./add-work-time-hours.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddWorkTimeHoursComponent extends LoadingState implements OnInit, OnDestroy {
	public projectOptions$ = this.getProjectOptions$();
	public monthOptions$ = this.getMonthOptions$();
	public addHoursForm = this.initForm();
	public dateControl = new FormControl(DateTime.now());
	private destroy$ = new Subject();

	private get project(): ProjectOption {
		return this.addHoursForm.get('project')?.value as ProjectOption;
	}

	constructor(private fb: FormBuilder, private attendanceService: AttendanceService) {
		super();
	}

	public ngOnInit(): void {
		this.toggleDisabledStateOnMonthChange();
		this.setNewDateOnMonthChange();
		this.updateDateOnExternalChange();
	}

	public ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}

	private toggleDisabledStateOnMonthChange(): void {
		this.attendanceService.canEdit$.pipe(takeUntil(this.destroy$)).subscribe({
			next: (canEdit: boolean) => {
				if (canEdit) {
					this.addHoursForm.enable();
				} else {
					this.addHoursForm.disable();
				}
			},
		});
	}

	//update page date when dateControl value changes
	private setNewDateOnMonthChange(): void {
		this.dateControl.valueChanges
			.pipe(takeUntil(this.destroy$))
			.subscribe((date: DateTime) => this.changeDate(date));
	}

	//update dateControl value when page date changes
	private updateDateOnExternalChange(): void {
		this.attendanceService.selectedDate$.pipe(takeUntil(this.destroy$)).subscribe({
			next: (date: DateTime) => {
				if (!this.compareDate(date, this.dateControl.value)) {
					this.dateControl.setValue(date, { emitEvent: false });
				}
			},
		});
	}

	private getProjectOptions$(): Observable<ProjectOption[]> {
		return this.attendanceService.workTimes$.pipe(
			map((workTimes: WorkTime[]) => {
				const isOtherExists = workTimes.some((wt: WorkTime) => isGUIDEmpty(wt.project.id));
				const projects = workTimes
					.map((wt: WorkTime) => ({
						id: wt.id,
						projectId: wt.project.id,
						name: wt.project.shortName as string,
						workTime: wt,
					}))
					.sort((p1: ProjectOption, p2: ProjectOption) => {
						if (isGUIDEmpty(p1.projectId)) {
							return 1;
						}
						if (isGUIDEmpty(p2.projectId)) {
							return -1;
						}

						return p1.name.localeCompare(p2.name);
					});
				return isOtherExists
					? projects
					: [...projects, { id: EMPTY_GUID, projectId: EMPTY_GUID, name: 'Другое' }];
			})
		);
	}

	private initForm(): FormGroup {
		return this.fb.group({
			time: ['', [Validators.required, Validators.min(0), Validators.max(744), DoValidators.intNum]],
			project: [null, Validators.required],
			comment: [null],
		});
	}

	public compareDate(d1: DateTime, d2: DateTime): boolean {
		return d1.year === d2.year && d1.month === d2.month;
	}

	public changeDate(date: DateTime): void {
		this.attendanceService.setNewDate(date);
	}

	public onSubmit(): void {
		if (this.addHoursForm.invalid) {
			this.addHoursForm.markAllAsTouched();
			return;
		}

		this.setLoading(true);
		const submitValue: SubmitWorkTimeValue = {
			workTimeId: this.project.id,
			initialValue: this.project.workTime,
			time: this.addHoursForm.get('time')?.value,
			comment: this.addHoursForm.get('comment')?.value,
		};
		this.attendanceService
			.submitWorkTime(submitValue)
			.pipe(finalize(() => this.setLoading(false)))
			.subscribe(() => this.addHoursForm.reset());
	}

	public patchWorkTimeInfoIntoForm(): void {
		const project = this.project;
		const isOtherOptionSelected = isGUIDEmpty(project.projectId);
		const commentControl = this.addHoursForm.get('comment') as FormControl;

		if (isOtherOptionSelected) {
			commentControl.addValidators(Validators.required);
			commentControl.updateValueAndValidity();
		} else if (commentControl.hasValidator(Validators.required)) {
			commentControl.clearValidators();
			commentControl.updateValueAndValidity();
		}
		if (project.workTime) {
			const timeControl = this.addHoursForm.get('time') as FormControl;
			if (timeControl.value === '' || timeControl.value == null) {
				this.addHoursForm.patchValue({
					time: project.workTime.userHours,
				});
			}
			if (!commentControl.value) {
				this.addHoursForm.patchValue({
					comment: project.workTime.description,
				});
			}
		}
	}

	private getMonthOptions$(): Observable<DateTime[]> {
		return this.attendanceService.selectedDate$.pipe(
			map((date: DateTime) => {
				if (
					date.day <= LAST_DAY_TO_FILL_HOURS &&
					date.month === DateTime.now().month &&
					date.year === DateTime.now().year
				) {
					const currentDate = DateTime.now();
					return [currentDate, currentDate.minus({ months: 1 })];
				} else if (date.month === DateTime.now().month && date.year === DateTime.now().year) {
					return [DateTime.now()];
				}
				return [date, DateTime.now()];
			})
		);
	}
}
