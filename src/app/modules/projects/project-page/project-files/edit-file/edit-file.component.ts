import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { LoadingState } from '@shared/directives/button-loading.directive';
import { FileAccessType } from '@api/file-service/models/file-access-type';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DoValidators } from '@app/validators/do-validators';
import { FileInfo } from '@api/project-service/models/file-info';

@Component({
	selector: 'do-edit-file',
	templateUrl: './edit-file.component.html',
	styleUrls: ['./edit-file.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditFileComponent extends LoadingState implements OnInit {
	public readonly fileAccessType = [
		{ value: FileAccessType.Public, label: 'Всем' },
		{ value: FileAccessType.Team, label: 'Только команде проекта' },
		{ value: FileAccessType.Manager, label: 'Только менеджеру' },
	];

	public form!: FormGroup;

	constructor(
		@Inject(MAT_DIALOG_DATA) private file: FileInfo,
		private fb: FormBuilder,
		private dialogRef: MatDialogRef<EditFileComponent>
	) {
		super();
	}

	public ngOnInit(): void {
		const { name, extension, size, access } = this.file;
		this.form = this.fb.group({
			name: [name, DoValidators.required],
			extension: [{ value: extension.slice(1).toUpperCase(), disabled: true }],
			size: [{ value: size, disabled: true }],
			accessType: [access, DoValidators.required],
		});
	}

	public submit(): void {
		if (this.form.invalid) {
			this.form.markAllAsTouched();
			return;
		}
		this.setLoading(true);
	}
}
