import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TableCell } from '../../models';
import { TableCellComponent } from '../../table-cell.component';

export class EditableTextFieldParams {
	public updateRow?: (o: any, v: string) => void;
	public disabled = false;

	constructor(params?: Partial<{ updateRow: (o: any, v: string) => void; disabled: boolean }>) {
		if (!params) {
			return;
		}
		this.updateRow = params.updateRow;
		this.disabled = params.disabled || this.disabled;
	}
}

@Component({
	selector: 'do-editable-text-field',
	template: `
		<span *ngIf="!isEditMode" class="editable" (click)="toggleEdit(true)">{{ value }}</span>
		<do-form-field *ngIf="isEditMode" class="input">
			<mat-form-field>
				<input
					doAutofocus
					matInput
					type="text"
					[(ngModel)]="value"
					(keydown.enter)="toggleEdit(false)"
					(blur)="toggleEdit(false)"
				/>
			</mat-form-field>
		</do-form-field>
	`,
	styles: [
		`
			:host {
				display: flex;
			}

			.editable {
				cursor: pointer;
				text-overflow: ellipsis;
				overflow: hidden;
				white-space: nowrap;
			}

			.input {
				width: 100%;
			}
		`,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditableTextFieldComponent implements TableCell<string> {
	public value!: string;
	public params!: EditableTextFieldParams;
	private row: any;

	public isEditMode = false;

	constructor(tableCell: TableCellComponent) {
		this.row = tableCell.row;
	}

	public toggleEdit(isEdit: boolean): void {
		if (this.params.disabled) {
			return;
		}
		this.isEditMode = isEdit;
		if (!isEdit && this.params.updateRow) {
			this.params.updateRow(this.row, this.value);
		}
	}
}
