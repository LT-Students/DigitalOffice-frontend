import { Component, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { TimeService } from '@app/services/time/time.service';
import { AttendanceService } from '@app/services/attendance.service';
import { switchMap } from 'rxjs/operators';
import { IDialogResponse } from '../../components/user-tasks/user-tasks.component';
import { DoValidators } from '@app/validators/do-validators';
import { TimeDurationService } from '@app/services/time-duration.service';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
	selector: 'do-edit-project',
	templateUrl: './edit-project.component.html',
	styleUrls: ['./edit-project.component.scss'],
})
export class EditProjectComponent {
	public editForm: FormGroup;
	public projectDate: Date;

	public inputErrorMessage: string;

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
		this.inputErrorMessage = this._getError();
	}

	private _initFormGroup(): FormGroup {
		return this._fb.group({
			userHours: [this.project.userHours,
			[
				Validators.required,
				DoValidators.number,
				Validators.max(this._timeDurationService.countMaxMonthDuration(this.project.year, this.project.month - 1)),
				Validators.min(1)
			]
			],
			description: [this.project.description],
		});
	}

	public onHoursInput(): void {
		this.inputErrorMessage = this._getError();
	}

	public onSubmitClick(): void {
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
						path: '/UserHours',
						value: this.editForm.get('userHours')?.value,
					}
				],
			})
			.pipe(switchMap(() => this._attendanceService.getActivities()))
			.subscribe(() => this.onClose());
	}

	public onClose(params?: IDialogResponse): void {
		this._dialogRef.close(params);
	}

	private _getError() {
		let inputErrorMessage = "";
		const controlErrors = this.editForm.controls['userHours'].errors;

		if (controlErrors?.required) {
			inputErrorMessage = "Заполните поле"
		} else if (controlErrors?.number) {
			inputErrorMessage = "Введите число"
		} else if (controlErrors?.max) {
			inputErrorMessage = "Превышено максимальное значение часов за месяц"
		} else if (controlErrors?.min) {
			inputErrorMessage = "Минимальное значение должно быть больше 0"
		}

		return inputErrorMessage;
	}
}
