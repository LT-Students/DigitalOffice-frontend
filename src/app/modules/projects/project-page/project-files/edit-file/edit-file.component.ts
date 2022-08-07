import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { LoadingState } from '@shared/directives/button-loading.directive';
import { FileAccessType } from '@api/file-service/models/file-access-type';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DoValidators } from '@app/validators/do-validators';

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

	constructor(@Inject(MAT_DIALOG_DATA) private fileInfo: any, private fb: FormBuilder) {
		super();
	}

	public ngOnInit(): void {
		this.fileInfo = {
			name: 'document-name.png',
			extension: '.png',
			size: 123,
			accessType: FileAccessType.Manager,
		};
		const { name, extension, size, accessType } = this.fileInfo;
		this.form = this.fb.group({
			name: [name, DoValidators.required],
			extension: [{ value: extension, disabled: true }],
			size: [{ value: size, disabled: true }],
			accessType: [accessType, DoValidators.required],
		});
	}
}
