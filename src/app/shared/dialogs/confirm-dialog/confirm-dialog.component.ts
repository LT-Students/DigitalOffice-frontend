import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoadingState } from '@app/utils/loading-state';

export interface ConfirmDialogData {
	title: string;
	message?: string;
	confirmText: string;
	action$?: Observable<any>;
}

@Component({
	selector: 'do-confirm-dialog',
	templateUrl: './confirm-dialog.component.html',
	styleUrls: ['./confirm-dialog.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmDialogComponent extends LoadingState {
	constructor(
		@Inject(DIALOG_DATA) public data: ConfirmDialogData,
		private dialogRef: DialogRef<ConfirmDialogComponent>
	) {
		super();
	}

	public onClose(result: any): void {
		this.dialogRef.close(result);
	}

	public onConfirm(): void {
		const action$ = this.data.action$;
		if (!action$) {
			this.onClose(true);
			return;
		}

		this.setLoading(true);
		action$.pipe(finalize(() => this.setLoading(false))).subscribe({ next: (result: any) => this.onClose(result) });
	}
}
