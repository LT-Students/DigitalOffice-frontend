import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { Icons } from '@shared/modules/icons/icons';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UploadFile } from '../add-files.service';

@Component({
	selector: 'do-upload-progress',
	templateUrl: './upload-progress.component.html',
	styleUrls: ['./upload-progress.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UploadProgressComponent implements OnInit {
	public readonly Icons = Icons;

	constructor(@Inject(MAT_DIALOG_DATA) public files: UploadFile[]) {}

	ngOnInit(): void {}
}
