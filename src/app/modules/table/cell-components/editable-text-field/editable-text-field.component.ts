import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TableCell } from '../../models';
import { TableCellComponent } from '../../table-cell.component';

export class EditableTextFieldParams {
	public updateRow?: (o: any, v: string) => void;

	constructor(params?: { updateRow: (o: any, v: string) => void }) {
		this.updateRow = params?.updateRow;
	}
}

@Component({
	selector: 'do-editable-text-field',
	template: `
		<span *ngIf="!isEditMode" class="no-overflow" (click)="toggleEdit(true)">{{ value }}</span>
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

			.no-overflow {
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
export class EditableTextFieldComponent implements OnInit, TableCell<string> {
	public value!: string;
	public params!: EditableTextFieldParams;
	private row: any;

	public isEditMode = false;

	constructor(tableCell: TableCellComponent) {
		this.row = tableCell.row;
	}

	ngOnInit(): void {}

	public toggleEdit(isEdit: boolean): void {
		this.isEditMode = isEdit;
		if (!isEdit && this.params.updateRow) {
			this.params.updateRow(this.row, this.value);
		}
	}
}
