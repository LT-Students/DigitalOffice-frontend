import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { DateTime } from 'luxon';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { filter, finalize, map, takeUntil, withLatestFrom } from 'rxjs/operators';
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
	public monthOptions = this.getMonthOptions();
	public addHoursForm = this.initForm();
	public dateControl = new FormControl(DateTime.now());
	private wasProjectPreviouslySelected = false;
	private destroy$ = new Subject();

	private get project(): ProjectOption {
		return this.addHoursForm.get('project')?.value as ProjectOption;
	}

	constructor(private fb: FormBuilder, private attendanceService: AttendanceService) {
		super();
	}

	public ngOnInit(): void {
		this.setNewDateOnMonthChange();
	}

	public ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}

	//update page date when dateControl value changes
	private setNewDateOnMonthChange(): void {
		this.dateControl.valueChanges
			.pipe(takeUntil(this.destroy$))
			.subscribe((date: DateTime) => this.changeDate(date));
	}

	private getProjectOptions$(): Observable<ProjectOption[]> {
		return this.attendanceService.workTimes$.pipe(
			withLatestFrom(this.attendanceService.selectedDate$),
			filter(([_, selectedDate]: [WorkTime[], DateTime]) => this.canEditWorkTime(selectedDate)),
			map(([workTimes, _]: [WorkTime[], DateTime]) => workTimes),
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

	private canEditWorkTime(date: DateTime): boolean {
		const now = this.dateControl.value as DateTime;
		return now.year === date.year && now.month === date.month;
	}

	private initForm(): FormGroup {
		return this.fb.group({
			time: ['', [DoValidators.required, DoValidators.min(0), DoValidators.max(744), DoValidators.intNum]],
			project: [null, DoValidators.required],
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
			.submitWorkTime(submitValue, this.dateControl.value)
			.pipe(finalize(() => this.setLoading(false)))
			.subscribe(() => this.addHoursForm.reset());
	}

	public patchWorkTimeInfoIntoForm(): void {
		const project = this.project;
		const isOtherOptionSelected = isGUIDEmpty(project.projectId);
		const commentControl = this.addHoursForm.get('comment') as FormControl;

		if (isOtherOptionSelected) {
			commentControl.addValidators(DoValidators.required);
			commentControl.updateValueAndValidity();
		} else if (commentControl.hasValidator(DoValidators.required)) {
			commentControl.clearValidators();
			commentControl.updateValueAndValidity();
		}
		if (!this.wasProjectPreviouslySelected) {
			const hours = this.addHoursForm.get('time')?.value;
			this.addHoursForm.patchValue(
				{
					time: hours || project.workTime?.userHours,
					comment: project.workTime?.description,
				},
				{ emitEvent: false }
			);
		} else {
			this.addHoursForm.patchValue(
				{
					time: project.workTime?.userHours,
					comment: project.workTime?.description,
				},
				{ emitEvent: false }
			);
		}

		this.wasProjectPreviouslySelected = true;
	}

	private getMonthOptions(): DateTime[] {
		const currentDate = DateTime.now();
		if (currentDate.day <= LAST_DAY_TO_FILL_HOURS) {
			return [currentDate, currentDate.minus({ months: 1 })];
		}
		return [currentDate];
	}
}
