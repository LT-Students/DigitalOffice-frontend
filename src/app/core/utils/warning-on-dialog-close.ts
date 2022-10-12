import { MatDialogRef } from '@angular/material/dialog';
import { merge, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { DialogRef } from '@angular/cdk/dialog';
import { DialogService } from '@shared/component/dialog/dialog.service';

export class WarningOnDialogClose {
	public get closeEvents$(): Observable<MouseEvent | KeyboardEvent> {
		const { backdropClick, keydownEvents } = this.dialogRef;
		return merge(
			typeof backdropClick === 'function' ? backdropClick() : backdropClick,
			(typeof keydownEvents === 'function' ? keydownEvents() : keydownEvents).pipe(
				filter((e: KeyboardEvent) => e.key === 'Escape')
			)
		);
	}

	constructor(private dialogRef: MatDialogRef<any> | DialogRef<any>, private dialog: DialogService) {}

	public beforeClose(isFormDirty: boolean): void {
		if (isFormDirty) {
			this.dialog
				.confirm({
					title: 'Вы уверены?',
					message: 'Закрыть окно? Ваши данные не сохранятся',
					confirmText: 'Да, закрыть',
				})
				.closed.subscribe({
					next: (confirm?: boolean) => (confirm ? this.close() : null),
				});
		} else {
			this.close();
		}
	}

	private close(): void {
		this.dialogRef.close();
	}
}
