import { MatDialogRef } from '@angular/material/dialog/dialog-ref';
import { merge, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { DialogService } from '@app/services/dialog.service';

export class WarningOnDialogClose {
	public get closeEvents$(): Observable<MouseEvent | KeyboardEvent> {
		return merge(
			this.dialogRef.backdropClick(),
			this.dialogRef.keydownEvents().pipe(filter((e: KeyboardEvent) => e.key === 'Escape'))
		);
	}

	constructor(private dialogRef: MatDialogRef<any>, private dialog: DialogService) {}

	public beforeClose(isFormDirty: boolean): void {
		if (isFormDirty) {
			this.dialog
				.confirm({
					title: 'Вы уверены?',
					message: 'Закрыть окно? Ваши данные не сохранятся',
					confirmText: 'Да, закрыть',
				})
				.afterClosed()
				.subscribe({
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
