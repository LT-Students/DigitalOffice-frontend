import { ChangeDetectionStrategy, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { WorkTimeMonthLimitInfo } from '@api/time-service/models/work-time-month-limit-info';
import { LeaveTime } from '../../time-tracker/models/leave-time';
import { TimeService } from '../services/time.service';
import { AddLeaveTimeBaseComponent } from '../../time-tracker/shared/add-leave-time-base/add-leave-time-base.component';
import { SubmitLeaveTimeValue } from '../../time-tracker/services/attendance.service';
import { AddLeaveTimeDialogService } from './add-leave-time-dialog.service';

export interface DialogData {
	userId: string;
	rate: number;
	holidays: (WorkTimeMonthLimitInfo | null)[];
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
})
export class AddLeaveTimeDialogComponent implements OnInit {
	@ViewChild(AddLeaveTimeBaseComponent, { static: true }) baseComponent!: AddLeaveTimeBaseComponent;

	constructor(
		@Inject(DIALOG_DATA) private data: DialogData,
		private dialogRef: DialogRef,
		private addLeaveTimeDialog: AddLeaveTimeDialogService,
		private timeService: TimeService
	) {}

	public ngOnInit(): void {
		const { userId, rate, holidays } = this.data;
		this.timeService.findUserLeaveTimes(userId).subscribe({
			next: (leaveTimes: LeaveTime[]) =>
				this.addLeaveTimeDialog.setInitialData(leaveTimes, holidays, rate, userId),
		});
	}

	public handleSubmit(): void {
		this.baseComponent.submit$().subscribe({
			next: (v: Required<SubmitLeaveTimeValue>) => this.dialogRef.close(v),
		});
	}
}
