import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { TimeService } from '@app/services/time/time.service';
import { finalize, switchMap } from 'rxjs/operators';
import { DoValidators } from '@app/validators/do-validators';
import { TimeDurationService } from '@app/services/time-duration.service';
import { BehaviorSubject } from 'rxjs';
import { AttendanceService } from '../../services/attendance.service';
import { IDialogResponse } from '../../components/user-tasks/user-tasks.component';

@Component({
	selector: 'do-edit-project',
	templateUrl: './edit-project.component.html',
	styleUrls: ['./edit-project.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditProjectComponent {
	public editForm: FormGroup;
	public projectDate: Date;
	public loading: BehaviorSubject<boolean>;

	constructor(
		@Inject(MAT_DIALOG_DATA) public project: any,
		private _fb: FormBuilder,
		private _dialogRef: MatDialogRef<EditProjectComponent, IDialogResponse>,
		private _timeService: TimeService,
		private _attendanceService: AttendanceService,
		private _timeDurationService: TimeDurationService
	) {
		this.editForm = this._initFormGroup();
		this.projectDate = new Date(this.project.year, this.project.month - 1);
		this.loading = new BehaviorSubject<boolean>(false);
	}

	private _initFormGroup(): FormGroup {
		return this._fb.group({
			userHours: [
				this.project.userHours,
				[
					Validators.required,
					DoValidators.intNum,
					Validators.max(
						this._timeDurationService.countMaxMonthDuration(this.project.year, this.project.month)
					),
					Validators.min(1),
				],
			],
			description: [this.project.description],
		});
	}

	public onSubmitClick(): void {
		this.loading.next(true);
		this._timeService
			.editWorkTime({
				workTimeId: this.project.id,
				body: [
					{
						op: 'replace',
						path: '/Description',
						value: this.editForm.get('description')?.value,
					},
					{
						op: 'replace',
						// path: '/UserHours',
						path: '/Hours',
						value: this.editForm.get('userHours')?.value,
					},
				],
			})
			.pipe(
				switchMap(() => this._attendanceService.getActivities()),
				finalize(() => {
					this.loading.next(false);
				})
			)
			.subscribe(() => {
				this.onClose();
			});
	}

	public onClose(params?: IDialogResponse): void {
		this._dialogRef.close(params);
	}
}
