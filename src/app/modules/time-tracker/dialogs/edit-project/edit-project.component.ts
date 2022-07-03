import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { finalize } from 'rxjs/operators';
import { DoValidators } from '@app/validators/do-validators';
import { BehaviorSubject } from 'rxjs';
import { DateTime } from 'luxon';
import { EditRequest, WorkTimePath } from '@app/types/edit-request';
import { AttendanceService } from '../../services/attendance.service';
import { IDialogResponse } from '../../components/user-tasks/user-tasks.component';
import { WorkTime } from '../../models/work-time';

@Component({
	selector: 'do-edit-project',
	templateUrl: './edit-project.component.html',
	styleUrls: ['./edit-project.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditProjectComponent {
	public editForm = this.initFormGroup();
	public workTimeDate = DateTime.fromObject({ year: this.workTime.year, month: this.workTime.month });
	public loading = new BehaviorSubject(false);

	constructor(
		@Inject(MAT_DIALOG_DATA) public workTime: WorkTime,
		private fb: FormBuilder,
		private dialogRef: MatDialogRef<EditProjectComponent, IDialogResponse>,
		private attendanceService: AttendanceService
	) {}

	private initFormGroup(): FormGroup {
		return this.fb.group({
			userHours: [
				this.workTime.userHours,
				[Validators.required, DoValidators.intNum, Validators.max(744), Validators.min(0)],
			],
			description: [this.workTime.description],
		});
	}

	private getEditRequest(): EditRequest<WorkTimePath> {
		return ['userHours', 'description']
			.filter((key: string) => this.workTime[key as keyof WorkTime] !== this.editForm.get(key)?.value)
			.map((key: string) => ({
				path: key === 'userHours' ? WorkTimePath.Hours : WorkTimePath.Description,
				op: 'replace',
				value: this.editForm.get(key)?.value,
			}));
	}

	public onSubmitClick(): void {
		const editRequest = this.getEditRequest();
		if (!editRequest.length) {
			this.close();
			return;
		}

		this.loading.next(true);
		this.attendanceService
			.editWorkTime(this.workTime.id, editRequest)
			.pipe(
				finalize(() => {
					this.loading.next(false);
				})
			)
			.subscribe(() => {
				this.close();
			});
	}

	public close(): void {
		this.dialogRef.close();
	}
}
