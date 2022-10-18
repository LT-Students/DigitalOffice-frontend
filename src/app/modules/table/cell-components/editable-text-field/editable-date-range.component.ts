import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { I18nPluralPipe } from '@angular/common';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { DateFilterFn, MatCalendarCellClassFunction, MatDateRangeInput } from '@angular/material/datepicker';
import { DateTime } from 'luxon';
import { WorkTimeInfo } from '@api/time-service/models/work-time-info';
import { RANGE_DATE_FORMAT } from '@app/configs/date-formats';
import { Icons } from '@shared/modules/icons/icons';
import { TableCell } from '../../models';
import { TableCellComponent } from '../../table-cell.component';
import { LeaveTime } from '../../../manager-timelist/models/user-stat';
import { EditableTextFieldParams } from './editable-text-field.component';

export class EditableDateRangeParams extends EditableTextFieldParams {
	public minDate?: DateTime;
	public maxDate?: DateTime;
	public disableReservedDays: any;
	public dateClass: any;

	constructor(
		params?: Partial<
			{
				minDate: DateTime;
				maxDate: DateTime;
				disableReservedDays: DateFilterFn<DateTime>;
				dateClass: MatCalendarCellClassFunction<DateTime>;
			} & EditableTextFieldParams
		>
	) {
		super(params);
		this.minDate = params?.minDate;
		this.maxDate = params?.maxDate;
		this.disableReservedDays = params?.disableReservedDays;
		this.dateClass = params?.dateClass;
	}
}

@Component({
	selector: 'do-editable-date-range',
	template: `
		<div class="flex flex_ai_center position-relative">
			<span *ngIf="!isEditMode" class="editable" [class.enabled]="!params.disabled" (click)="enableEditMode()">{{
				previousValue | execute: getLeavePeriodString.bind(this)
			}}</span>
			<do-form-field *ngIf="isEditMode" class="range-picker" [formGroup]="form">
				<mat-form-field>
					<mat-date-range-input
						#rangeInput
						[min]="params.minDate"
						[max]="params.maxDate"
						[dateFilter]="params.disableReservedDays"
						[rangePicker]="$any(picker)"
						(click)="picker.open()"
					>
						<input
							doAutofocus
							matStartDate
							placeholder="ДД/ММ/ГГГГ"
							formControlName="startDate"
							data-test="leave-start-date-input"
							(keydown.enter)="save()"
							(keydown.escape)="revert()"
							(blur)="revert($any(rangeInput))"
						/>
						<input
							matEndDate
							placeholder="ДД/ММ/ГГГГ"
							formControlName="endDate"
							data-test="leave-end-date-input"
							(keydown.enter)="save()"
							(keydown.escape)="revert()"
							(blur)="revert($any(rangeInput))"
						/>
					</mat-date-range-input>
					<mat-datepicker-toggle matSuffix [for]="picker" data-test="leave-interval-datepicker">
						<mat-icon matDatepickerToggleIcon fontSet="material-icons-outlined">date_range</mat-icon>
					</mat-datepicker-toggle>
					<mat-date-range-picker
						#picker
						[dateClass]="params.dateClass"
						(closed)="handleDateSelection()"
					></mat-date-range-picker>
				</mat-form-field>
			</do-form-field>
			<mat-icon
				*ngIf="row.managerHours != null"
				class="text-secondary_default icon"
				[svgIcon]="Icons.InfoOutline"
				[doPopoverTrigger]="popover"
				position="below"
			></mat-icon>
			<do-popover #popover>
				<span class="mat-body-2">Автор изменения</span>
				<p>{{ row.manager ? (row.manager | fullName) : '—' }}</p>
				<span class="mat-body-2">Часы сотрудника</span>
				<p>{{ row.userHours || 0 }}</p>
			</do-popover>
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

			.icon {
				position: absolute;
				left: 64px;
			}

			.range-picker {
				max-width: 255px;
			}
		`,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [I18nPluralPipe, { provide: MAT_DATE_FORMATS, useValue: RANGE_DATE_FORMAT }],
})
export class EditableDateRangeComponent implements TableCell<LeaveTime> {
	public readonly Icons = Icons;

	public form = this.fb.group({
		startDate: this.fb.control<DateTime | null>(null, [Validators.required]),
		endDate: this.fb.control<DateTime | null>(null, [Validators.required]),
	});

	public params!: EditableDateRangeParams;
	public row: WorkTimeInfo;

	public isEditMode = false;

	public set value(v: LeaveTime) {
		this.form.patchValue(v, { emitEvent: false });
		this.previousValue = v;
	}
	public previousValue!: LeaveTime;

	constructor(tableCell: TableCellComponent, private fb: FormBuilder, private pluralPipe: I18nPluralPipe) {
		this.row = tableCell.row;
	}

	public enableEditMode(): void {
		if (this.params.disabled) {
			return;
		}
		this.isEditMode = true;
	}

	public save(): void {
		if (this.form.invalid) {
			this.form.markAsTouched();
			return;
		}
		this.isEditMode = false;
		const { startDate, endDate } = this.form.value;
		this.previousValue.startDate = startDate as DateTime;
		this.previousValue.endDate = endDate as DateTime;
		if (this.params.updateRow) {
			this.params.updateRow(this.row, String(this.form.value));
		}
	}

	public revert(rangeInput?: MatDateRangeInput<DateTime>): void {
		if (rangeInput?.focused || rangeInput?.rangePicker.opened) {
			return;
		}
		this.form.patchValue(this.previousValue);
		this.isEditMode = false;
	}

	public handleDateSelection(): void {
		const endDateControl = this.form.controls.endDate;
		const { startDate, endDate } = this.form.value;
		if (!startDate) return;
		if (!endDate) {
			endDateControl.setValue(startDate.endOf('day'));
		}
	}

	public getLeavePeriodString(lt: LeaveTime): string {
		const startDate = lt.startDate.toFormat('d.MM.yy');
		const endDate = lt.endDate.toFormat('d.MM.yy');
		const hoursPlural = this.pluralPipe.transform(lt.hours, {
			one: '# час',
			few: '# часа',
			other: '# часов',
		});
		return `${startDate} - ${endDate} (${hoursPlural})`;
	}
}
