import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { DialogRef } from '@angular/cdk/dialog';
import { AddLeaveTimeBaseComponent } from '@shared/modules/shared-time-tracking-system/add-leave-time-base/add-leave-time-base.component';
import { CreateLeaveTime, SubmitLeaveTimeValue } from '@shared/modules/shared-time-tracking-system/models';
import { CreateLeaveTimeService } from './create-leave-time.service';

export interface AddLeaveTimeDialogData {
	userId: string;
	rate: number;
}

@Component({
	selector: 'do-add-leave-time-dialog',
	template: `
		<h3 doUnderline>Добавить отсутствие</h3>
		<do-add-leave-time-base>
			<do-actions actions class="controls">
				<button doButton doDialogClose data-test="close-dialog-btn">Отменить</button>
				<button
					mat-flat-button
					color="primary"
					type="submit"
					[loading]="baseComponent.loadingState.loading$ | async"
					(click)="handleSubmit()"
					data-test="edit-leave-save-btn"
				>
					Сохранить
				</button>
			</do-actions>
		</do-add-leave-time-base>
	`,
	styles: [],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [{ provide: CreateLeaveTime, useClass: CreateLeaveTimeService }],
})
export class AddLeaveTimeDialogComponent {
	@ViewChild(AddLeaveTimeBaseComponent, { static: true }) baseComponent!: AddLeaveTimeBaseComponent;

	constructor(private dialogRef: DialogRef) {}

	public handleSubmit(): void {
		this.baseComponent.submit$().subscribe({
			next: (v: Required<SubmitLeaveTimeValue>) => this.dialogRef.close(v),
		});
	}
}
