import {
	Component,
	ChangeDetectionStrategy,
	ElementRef,
	ViewChildren,
	QueryList,
	OnInit,
	OnDestroy,
	ChangeDetectorRef,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { I18nPluralPipe } from '@angular/common';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { DateFilterFn, MatCalendarCellClassFunction, MatDateRangePicker } from '@angular/material/datepicker';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DateTime, Interval } from 'luxon';
import { RANGE_DATE_FORMAT } from '@app/configs/date-formats';
import { UtilitiesService } from '@app/services/utilities.service';
import { Icons } from '@shared/modules/icons/icons';
import { DialogService } from '@shared/component/dialog/dialog.service';
import { TableCellComponent } from '../../table-cell.component';
import { TableCell } from '../../models';

export class EditableDateRangeParams {
	public minDate: DateTime | null = null;
	public maxDate: DateTime | null = null;
	public disableReservedDays?: DateFilterFn<DateTime>;
	public dateClass?: MatCalendarCellClassFunction<DateTime>;
	public updateRow?: (o: any, v: DateRangeValue) => void;
	public disabled?: boolean;

	constructor(
		params?: Partial<{
			minDate: DateTime;
			maxDate: DateTime;
			disableReservedDays: DateFilterFn<DateTime>;
			dateClass: MatCalendarCellClassFunction<DateTime>;
			disabled: boolean;
			updateRow: (o: any, v: DateRangeValue) => void;
		}>
	) {
		if (params) {
			this.minDate = params.minDate || null;
			this.maxDate = params.maxDate || null;
			this.disableReservedDays = params.disableReservedDays;
			this.dateClass = params.dateClass;
			this.disabled = params.disabled;
			this.updateRow = params.updateRow;
		}
	}
}

interface DateRangeValue {
	startDate: DateTime;
	endDate: DateTime;
	hours: number;
}

@Component({
	selector: 'do-editable-date-range',
	template: `
		<div class="flex flex_ai_center position-relative">
			<span *ngIf="!isEditMode" class="editable" [class.enabled]="!params.disabled">{{
				defaultValue | execute: getLeavePeriodString.bind(this)
			}}</span>
			<div *ngIf="isEditMode" class="flex">
				<do-form-field class="range-picker" [formGroup]="form">
					<mat-form-field>
						<mat-date-range-input
							[min]="params.minDate"
							[max]="params.maxDate"
							[dateFilter]="disableReservedDays"
							[rangePicker]="$any(picker)"
						>
							<input
								doAutofocus
								matStartDate
								placeholder="ДД/ММ/ГГГГ"
								formControlName="startDate"
								data-test="leave-start-date-input"
								(keydown.enter)="save()"
							/>
							<input
								matEndDate
								placeholder="ДД/ММ/ГГГГ"
								formControlName="endDate"
								data-test="leave-end-date-input"
								(keydown.enter)="save()"
							/>
						</mat-date-range-input>
						<mat-datepicker-toggle matSuffix [for]="picker" data-test="leave-interval-datepicker">
							<mat-icon matDatepickerToggleIcon fontSet="material-icons-outlined">date_range</mat-icon>
						</mat-datepicker-toggle>
						<mat-date-range-picker
							#picker
							[dateClass]="params.dateClass || dateClass"
							(closed)="handleDateSelection()"
						></mat-date-range-picker>
					</mat-form-field>
				</do-form-field>
				<button mat-flat-button class="submit" color="primary" (click)="save()">
					<mat-icon>done</mat-icon>
				</button>
			</div>
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
				white-space: pre;
				line-height: 18px;
			}

			.submit {
				position: relative;
				right: 6px;
				z-index: 1;
				padding: 0;
				min-width: 48px;
				height: 40px;
			}

			.enabled {
				cursor: pointer;
			}

			.icon {
				position: absolute;
				left: 64px;
			}

			.range-picker {
				position: relative;
				z-index: 2;
				max-width: 255px;
			}
		`,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [I18nPluralPipe, { provide: MAT_DATE_FORMATS, useValue: RANGE_DATE_FORMAT }],
})
export class EditableDateRangeComponent implements OnInit, OnDestroy, TableCell<DateRangeValue> {
	public readonly Icons = Icons;

	@ViewChildren(MatDateRangePicker) rangePicker!: QueryList<MatDateRangePicker<DateTime>>;

	public form = this.fb.group({
		startDate: this.fb.control<DateTime | null>(null, [Validators.required]),
		endDate: this.fb.control<DateTime | null>(null, [Validators.required]),
	});

	public params!: EditableDateRangeParams;
	public row: any;

	public isEditMode = false;
	public disableReservedDays: DateFilterFn<DateTime> = () => true;
	public dateClass: MatCalendarCellClassFunction<DateTime> = () => '';

	public set value(v: DateRangeValue) {
		this.form.patchValue(v, { emitEvent: false });
		this.defaultValue = { ...v };
	}
	public defaultValue!: DateRangeValue;

	private isConfirmDialogOpened = false;
	private destroy$ = new Subject();

	constructor(
		tableCell: TableCellComponent,
		private fb: FormBuilder,
		private dialog: DialogService,
		private pluralPipe: I18nPluralPipe,
		private elementRef: ElementRef,
		private utilities: UtilitiesService,
		private cdr: ChangeDetectorRef
	) {
		this.row = tableCell.row;
	}

	public ngOnInit(): void {
		this.utilities.documentClickTarget$.pipe(takeUntil(this.destroy$)).subscribe({
			next: (target: HTMLElement) => {
				const clickedInside = this.elementRef.nativeElement.contains(target);
				const isDatepickerClosed = !this.rangePicker.get(0)?.opened;
				if (this.isEditMode && !clickedInside && isDatepickerClosed && !this.isConfirmDialogOpened) {
					this.checkIfValueChangedOnCancel();
				} else if (!this.isEditMode && clickedInside) {
					this.enableEditMode();
				}
				this.cdr.markForCheck();
			},
		});
		this.utilities.documentEscapePressed$.pipe(takeUntil(this.destroy$)).subscribe({
			next: () => {
				const isDatepickerClosed = !this.rangePicker.get(0)?.opened;
				if (this.isEditMode && isDatepickerClosed && !this.isConfirmDialogOpened) {
					this.checkIfValueChangedOnCancel();
				}
			},
		});
	}

	public ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}

	public enableEditMode(): void {
		if (this.params.disabled) {
			return;
		}
		this.excludeCurrentInterval();
		this.isEditMode = true;
	}

	public save(): void {
		if (this.form.invalid) {
			this.form.markAsTouched();
			return;
		}
		this.isEditMode = false;
		const { startDate, endDate } = this.form.value;
		this.defaultValue.startDate = startDate as DateTime;
		this.defaultValue.endDate = endDate as DateTime;
		if (this.params.updateRow) {
			this.params.updateRow(this.row, { ...this.form.value, hours: this.defaultValue.hours } as DateRangeValue);
		}
	}

	public revert(): void {
		this.form.patchValue(this.defaultValue);
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

	public getLeavePeriodString(v: DateRangeValue): string {
		const startDate = v.startDate.toFormat('d.MM.yy');
		const endDate = v.endDate.toFormat('d.MM.yy');
		const hoursPlural = this.pluralPipe.transform(v.hours, {
			one: '# час',
			few: '# часа',
			other: '# часов',
		});
		return `${startDate} - ${endDate}\n(${hoursPlural})`;
	}

	private checkIfValueChangedOnCancel(): void {
		if (
			+this.defaultValue.startDate !== +(this.form.value.startDate as DateTime) ||
			+this.defaultValue.endDate !== +(this.form.value.endDate as DateTime)
		) {
			this.isConfirmDialogOpened = true;
			this.dialog
				.confirm({
					title: 'Изменение даты отсутствия',
					message: 'Вы действительно хотите отменить изменение?',
					confirmText: 'Да',
				})
				.closed.subscribe({
					next: (confirmed?: boolean) => {
						if (confirmed) {
							this.revert();
						}
						// without setTimeout dialog close event emits before click, so immediately pops up a new dialog
						setTimeout(() => (this.isConfirmDialogOpened = false));
					},
				});
		} else {
			this.revert();
		}
	}

	private excludeCurrentInterval(): void {
		const disableReservedDaysFn = this.params.disableReservedDays;
		if (!disableReservedDaysFn) {
			return;
		}
		const { startDate, endDate } = this.defaultValue;
		const currentInterval = Interval.fromDateTimes(startDate, endDate.plus({ day: 1 }));
		this.disableReservedDays = (date: DateTime | null) => {
			if (date && currentInterval.contains(date)) {
				return true;
			}
			return disableReservedDaysFn(date);
		};
	}
}
