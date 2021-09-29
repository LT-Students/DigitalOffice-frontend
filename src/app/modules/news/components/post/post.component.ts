import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
	selector: 'do-post',
	templateUrl: './post.component.html',
	styleUrls: ['./post.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostComponent {
	constructor(
		@Inject(MAT_DIALOG_DATA) public data: any,
		private _dialogRef: MatDialogRef<PostComponent>,
	) { }

	public closeModal(): void {
		this._dialogRef.close();
	}
}
