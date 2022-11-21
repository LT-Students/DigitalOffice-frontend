import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DialogRef } from '@angular/cdk/dialog';
import { LoadingState } from '@app/utils/loading-state';
import { finalize } from 'rxjs/operators';
import { CreateNodeFormValue } from '../../shared/create-wiki-node-form/create-wiki-node-form.component';
import { WikiNodeType } from '../../models';
import { SubmitService } from './submit.service';

@Component({
	selector: 'do-create-wiki-node-dialog',
	templateUrl: './create-wiki-node-dialog.component.html',
	styleUrls: ['./create-wiki-node-dialog.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [SubmitService],
})
export class CreateWikiNodeDialogComponent {
	public readonly WikiNodeType = WikiNodeType;

	public createNodeForm = new FormControl<CreateNodeFormValue | null>(null);
	public loadingState = new LoadingState();

	public isRubricCreated = false;

	constructor(private dialogRef: DialogRef, private submitService: SubmitService) {}

	public submit(): void {
		if (this.createNodeForm.invalid) {
			this.createNodeForm.markAllAsTouched();
			return;
		}
		this.loadingState.setLoading(true);
		const value = this.createNodeForm.value as CreateNodeFormValue;
		this.submitService
			.submit$(value)
			.pipe(finalize(() => this.loadingState.setLoading(false)))
			.subscribe(() => this.dialogRef.close());
	}
}
