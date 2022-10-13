import { Directive, HostListener, Input } from '@angular/core';
import { DialogRef } from '@angular/cdk/dialog';

@Directive({
	selector: '[doDialogClose]',
})
export class DialogCloseDirective {
	@Input('doDialogClose') dialogResult: any;

	constructor(private dialogRef: DialogRef) {}

	@HostListener('click') handleHostClick(): void {
		this.dialogRef.close(this.dialogResult);
	}
}
