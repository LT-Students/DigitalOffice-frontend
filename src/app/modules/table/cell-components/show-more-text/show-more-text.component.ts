import {
	Component,
	ChangeDetectionStrategy,
	AfterViewChecked,
	ElementRef,
	Inject,
	ChangeDetectorRef,
	ViewChildren,
	QueryList,
	AfterViewInit,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { DOCUMENT } from '@angular/common';
import { TableCell } from '../../models';

export class ShowMoreTextParams {
	public numberOfLines?: number;
	public editEnabled?: boolean;
	public updateRow?: (o: any, v: string | null) => void;

	constructor(
		params?: Partial<{ numberOfLines: number; updateRow: (o: any, v: string | null) => void; editEnabled: boolean }>
	) {
		this.numberOfLines = params?.numberOfLines;
		this.editEnabled = params?.editEnabled;
		this.updateRow = params?.updateRow;
	}
}

const DEFAULT_NUMBER_OF_LINES = 3;

@Component({
	selector: 'do-show-more-text',
	template: `
		<div *ngIf="!isEditMode">
			<div
				#expandableText
				class="text break-word"
				[class.enabled]="params.editEnabled"
				[ngStyle]="textCollapsed ? { 'max-height': collapsedHeight + 'px', overflow: 'hidden' } : null"
				(click)="enableEditMode()"
			>
				{{ defaultValue | placeholder: '--' }}
			</div>
			<ng-container *ngIf="buttonShowed">
				<button *ngIf="textCollapsed" doButton class="button" (click)="textCollapsed = false">
					<span>Раскрыть</span>
					<mat-icon>keyboard_arrow_down</mat-icon>
				</button>
				<button *ngIf="!textCollapsed" doButton class="button" (click)="textCollapsed = true">
					<span>Свернуть</span>
					<mat-icon>keyboard_arrow_up</mat-icon>
				</button>
			</ng-container>
		</div>
		<div *ngIf="isEditMode">
			<do-form-field>
				<mat-form-field>
					<textarea
						matInput
						doAutofocus
						cdkTextareaAutosize
						maxlength="500"
						[formControl]="control"
						[cdkAutosizeMinRows]="2"
						[cdkAutosizeMaxRows]="3"
						(keydown.enter)="save()"
						(keydown.escape)="revert()"
						(blur)="revert()"
					></textarea>
				</mat-form-field>
			</do-form-field>
		</div>
	`,
	styles: [
		`
			.text {
				overflow: visible;
				height: auto;
			}
			.button {
				padding: 0;
			}
			.enabled {
				cursor: pointer;
			}
		`,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShowMoreTextComponent implements AfterViewInit, AfterViewChecked, TableCell<string> {
	@ViewChildren('expandableText') expandableText!: QueryList<ElementRef<HTMLSpanElement>>;

	public row: any;

	public set value(value: string) {
		this.control.setValue(value);
		this.defaultValue = value;
	}
	public control = new FormControl('');
	public defaultValue = '';

	public params!: ShowMoreTextParams;

	public textCollapsed = true;
	public buttonShowed = false;
	public isEditMode = false;

	public lineHeight = 22;

	public collapsedHeight = 0;

	constructor(@Inject(DOCUMENT) private document: Document, private cdr: ChangeDetectorRef) {}

	public ngAfterViewInit(): void {
		this.lineHeight = parseFloat(
			this.document.defaultView
				?.getComputedStyle(this.expandableText.first.nativeElement)
				.getPropertyValue('line-height') || '22'
		);
	}

	public ngAfterViewChecked(): void {
		if (!this.isEditMode) {
			this.checkHeight();
		}
	}

	public enableEditMode(): void {
		if (!this.params?.editEnabled) {
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
		this.defaultValue = this.control.value || '';
		if (this.params.updateRow) {
			this.params.updateRow(this.row, this.control.value);
		}
	}

	public revert(): void {
		this.control.setValue(this.defaultValue);
		this.isEditMode = false;
	}

	private checkHeight(): void {
		const numberOfLines = this.params?.numberOfLines || DEFAULT_NUMBER_OF_LINES;
		this.collapsedHeight = this.lineHeight * numberOfLines;
		this.buttonShowed = this.expandableText.first.nativeElement.scrollHeight > this.collapsedHeight;

		this.cdr.detectChanges();
	}
}
