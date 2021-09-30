import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { TimeService } from '@app/services/time/time.service';
import { AttendanceService } from '@app/services/attendance.service';
import { switchMap } from 'rxjs/operators';
import { IDialogResponse } from '../../components/user-tasks/user-tasks.component';

@Component({
	selector: 'do-edit-project',
	templateUrl: './edit-project.component.html',
	styleUrls: ['./edit-project.component.scss'],
})
export class EditProjectComponent {
	public editForm: FormGroup;
	public projectDate: Date;
	public loading: boolean;

	constructor(
		@Inject(MAT_DIALOG_DATA) public project: any,
		private _fb: FormBuilder,
		private _dialogRef: MatDialogRef<EditProjectComponent, IDialogResponse>,
		private _timeService: TimeService,
		private _attendanceService: AttendanceService
	) {
		this.editForm = this._initFormGroup();
		this.projectDate = new Date(this.project.year, this.project.month - 1);
		this.loading = false;
	}

	private _initFormGroup(): FormGroup {
		return this._fb.group({
			userHours: [this.project.userHours, [Validators.required]],
			managerHours: [this.project.managerHours, [Validators.required]],
			description: [this.project.description],
		});
	}

	public onSubmitClick(): void {
		this.loading = true;
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
					},
					// {
					// 	op: 'replace',
					// 	path: '/ManagerHours',
					// 	value: this.editForm.get('managerHours')?.value,
					// },
				],
			})
			.pipe(switchMap(() => this._attendanceService.getActivities()))
			.subscribe(() => { this.loading = false; this.onClose() });
	}

	public onClose(params?: IDialogResponse): void {
		this._dialogRef.close(params);
	}
}
