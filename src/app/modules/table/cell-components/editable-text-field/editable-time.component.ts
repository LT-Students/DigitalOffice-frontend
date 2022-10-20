import { Component, ChangeDetectionStrategy } from '@angular/core';
import { WorkTimeInfo } from '@api/time-service/models/work-time-info';
import { Icons } from '@shared/modules/icons/icons';
import { FormControl, Validators } from '@angular/forms';
import { TableCell } from '../../models';
import { TableCellComponent } from '../../table-cell.component';
import { EditableTextFieldParams } from './editable-text-field.component';

@Component({
	selector: 'do-editable-time',
	template: `
		<div class="flex flex_ai_center position-relative">
			<span *ngIf="!isEditMode" class="editable" [class.enabled]="!params.disabled" (click)="enableEditMode()">{{
				control.value
			}}</span>
			<do-form-field *ngIf="isEditMode" class="input">
				<mat-form-field>
					<input
						doAutofocus
						matInput
						doNumberInput
						type="text"
						maxlength="3"
						[formControl]="control"
						(keydown.enter)="save()"
						(keydown.escape)="revert()"
						(blur)="revert()"
					/>
				</mat-form-field>
			</do-form-field>
			<ng-container *ngIf="row.managerHours != null">
				<mat-icon
					class="text-secondary_default icon"
					[svgIcon]="Icons.InfoOutline"
					[doPopoverTrigger]="tooltip.template"
					position="below"
				></mat-icon>
				<do-work-time-changed-tooltip #tooltip [tooltipData]="$any(row)"></do-work-time-changed-tooltip>
			</ng-container>
		</div>
	`,
	styles: [
		`
			:host {
				display: block;
			}

			.editable {
				text-overflow: ellipsis;
				overflow: hidden;
				white-space: nowrap;
			}

			.enabled {
				cursor: pointer;
			}

			.input {
				width: 60px;
			}

			.icon {
				position: absolute;
				left: 64px;
			}
		`,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditableTimeComponent implements TableCell<number> {
	public readonly Icons = Icons;

	public control = new FormControl(0, {
		validators: [Validators.required, Validators.min(0), Validators.max(744)],
		nonNullable: true,
	});

	public params!: EditableTextFieldParams;
	public row: WorkTimeInfo;

	public isEditMode = false;

	public set value(v: number) {
		this.control.setValue(v, { emitEvent: false });
		this.previousValue = v;
	}
	private previousValue = 0;

	constructor(tableCell: TableCellComponent) {
		this.row = tableCell.row;
	}

	public enableEditMode(): void {
		if (this.params.disabled) {
			return;
		}
		this.isEditMode = true;
	}

	public save(): void {
		if (this.control.invalid) {
			this.control.markAsTouched();
			return;
		}
		this.isEditMode = false;
		this.previousValue = this.control.value;
		if (this.params.updateRow) {
			this.params.updateRow(this.row, String(this.control.value));
		}
	}

	public revert(): void {
		this.control.setValue(this.previousValue);
		this.isEditMode = false;
	}
}
