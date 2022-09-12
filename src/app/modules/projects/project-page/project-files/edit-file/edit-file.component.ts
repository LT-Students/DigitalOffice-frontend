import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { FileAccessType } from '@api/file-service/models/file-access-type';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DoValidators } from '@app/validators/do-validators';
import { FileInfo } from '@api/project-service/models/file-info';
import { forkJoin, of } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { LoadingState } from '@app/utils/loading-state';
import { FileService } from './file.service';

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
		private fileService: FileService,
		private dialogRef: MatDialogRef<EditFileComponent>,
		private route: ActivatedRoute
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
		const { name, accessType } = this.form.getRawValue();
		forkJoin([
			name !== this.file.name
				? this.fileService.editFileName(this.route.snapshot.params['id'], this.file.id, name)
				: of(null),
			accessType !== this.file.access ? this.fileService.editFileAccess(this.file.id, accessType) : of(null),
		])
			.pipe(finalize(() => this.setLoading(false)))
			.subscribe({
				next: () => {
					const newFile: FileInfo = { ...this.file, name, access: accessType };
					this.dialogRef.close(newFile);
				},
			});
	}
}
