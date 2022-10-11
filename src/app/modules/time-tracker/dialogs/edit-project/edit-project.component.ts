import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { DoValidators } from '@app/validators/do-validators';
import { DateTime } from 'luxon';
import { finalize } from 'rxjs/operators';
import { isGUIDEmpty } from '@app/utils/utils';
import { LoadingState } from '@app/utils/loading-state';
import { AttendanceService, SubmitWorkTimeValue } from '../../services/attendance.service';
import { WorkTime } from '../../models/work-time';

@Component({
	selector: 'do-edit-project',
	templateUrl: './edit-project.component.html',
	styleUrls: ['./edit-project.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditProjectComponent extends LoadingState implements OnInit {
	public editForm = this.initFormGroup();
	public workTimeDate = DateTime.fromObject({ year: this.workTime.year, month: this.workTime.month });

	constructor(
		@Inject(MAT_DIALOG_DATA) public workTime: WorkTime,
		private fb: UntypedFormBuilder,
		private dialogRef: MatDialogRef<EditProjectComponent>,
		private attendanceService: AttendanceService
	) {
		super();
	}

	public ngOnInit(): void {
		if (isGUIDEmpty(this.workTime.project.id)) {
			const description = this.editForm.get('description') as UntypedFormControl;
			description.setValidators([DoValidators.required]);
			description.updateValueAndValidity();
		}
	}

	private initFormGroup(): UntypedFormGroup {
		return this.fb.group({
			userHours: [
				this.workTime.userHours,
				[DoValidators.required, DoValidators.intNum, DoValidators.max(744), DoValidators.min(0)],
			],
			description: [this.workTime.description || ''],
		});
	}

	public onSubmit(): void {
		if (this.editForm.invalid) {
			this.editForm.markAllAsTouched();
			return;
		}

		this.setLoading(true);
		const submitValue: SubmitWorkTimeValue = {
			workTimeId: this.workTime.id,
			initialValue: this.workTime,
			time: this.editForm.get('userHours')?.value,
			comment: this.editForm.get('description')?.value.trim(),
		};
		this.attendanceService
			.submitWorkTime(submitValue, this.workTimeDate)
			.pipe(finalize(() => this.setLoading(false)))
			.subscribe(() => this.close());
	}

	public close(): void {
		this.dialogRef.close();
	}
}
