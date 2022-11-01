import { Component, ChangeDetectionStrategy, OnInit, ElementRef, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { WorkTimeInfo } from '@api/time-service/models/work-time-info';
import { UtilitiesService } from '@app/services/utilities.service';
import { Icons } from '@shared/modules/icons/icons';
import { DialogService } from '@shared/component/dialog/dialog.service';
import { TableCell } from '../../models';
import { TableCellComponent } from '../../table-cell.component';
import { EditableTextFieldParams } from './editable-text-field.component';

@Component({
	selector: 'do-editable-time',
	template: `
		<div class="flex flex_ai_center position-relative">
			<span *ngIf="!isEditMode" class="editable" [class.enabled]="!params.disabled">{{ control.value }}</span>
			<div *ngIf="isEditMode" class="flex">
				<do-form-field class="input">
					<mat-form-field>
						<input
							doAutofocus
							matInput
							doNumberInput
							type="text"
							maxlength="3"
							[formControl]="control"
							(keydown.enter)="save()"
						/>
					</mat-form-field>
				</do-form-field>
				<button mat-flat-button class="submit" color="primary" (click)="save()">
					<mat-icon>done</mat-icon>
				</button>
			</div>
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

			.submit {
				position: relative;
				right: 6px;
				z-index: 1;
				padding: 0;
				min-width: 48px;
				height: 40px;
			}

			.input {
				position: relative;
				z-index: 2;
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
export class EditableTimeComponent implements OnInit, OnDestroy, TableCell<number> {
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
		this.defaultValue = v;
	}
	private defaultValue = 0;

	private isConfirmDialogOpened = false;
	private destroy$ = new Subject();

	constructor(
		tableCell: TableCellComponent,
		private utilities: UtilitiesService,
		private dialog: DialogService,
		private elementRef: ElementRef,
		private cdr: ChangeDetectorRef
	) {
		this.row = tableCell.row;
	}

	public ngOnInit(): void {
		this.utilities.documentClickTarget$.pipe(takeUntil(this.destroy$)).subscribe({
			next: (target: HTMLElement) => {
				const clickedInside = this.elementRef.nativeElement.contains(target);
				if (this.isEditMode && !clickedInside && !this.isConfirmDialogOpened) {
					this.checkIfValueChangedOnCancel();
				} else if (!this.isEditMode && clickedInside) {
					this.enableEditMode();
				}
				this.cdr.markForCheck();
			},
		});
		this.utilities.documentEscapePressed$.pipe(takeUntil(this.destroy$)).subscribe({
			next: () => {
				if (this.isEditMode && !this.isConfirmDialogOpened) {
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
		this.isEditMode = true;
	}

	public save(): void {
		if (this.control.invalid) {
			this.control.markAsTouched();
			return;
		}
		this.isEditMode = false;
		this.defaultValue = this.control.value;
		if (this.params.updateRow) {
			this.params.updateRow(this.row, String(this.control.value));
		}
	}

	public revert(): void {
		this.control.setValue(this.defaultValue);
		this.isEditMode = false;
	}

	private checkIfValueChangedOnCancel(): void {
		if (this.defaultValue !== this.control.value) {
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
}
