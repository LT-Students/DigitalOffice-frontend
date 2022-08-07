import {
	Component,
	OnInit,
	ChangeDetectionStrategy,
	AfterViewChecked,
	ViewChild,
	ElementRef,
	Inject,
	ChangeDetectorRef,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { TableCell } from '../../models';

export class ShowMoreTextParams {
	public numberOfLines?: number;

	constructor(params: { numberOfLines?: number }) {}
}

const DEFAULT_NUMBER_OF_LINES = 3;

@Component({
	selector: 'do-show-more-text',
	template: `
		<div>
			<div
				#expandableText
				class="text break-word"
				[ngStyle]="textCollapsed ? { 'max-height': collapsedHeight + 'px', overflow: 'hidden' } : null"
			>
				{{ value | placeholder: '—' }}
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
		`,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShowMoreTextComponent implements OnInit, AfterViewChecked, TableCell<string> {
	@ViewChild('expandableText', { static: true }) text!: ElementRef<HTMLSpanElement>;

	public value = '';
	public set params(params: ShowMoreTextParams | undefined) {
		this.numberOfLines = params?.numberOfLines || DEFAULT_NUMBER_OF_LINES;
	}

	public textCollapsed = true;
	public buttonShowed = false;

	public numberOfLines = DEFAULT_NUMBER_OF_LINES;
	public lineHeight = 22;

	public collapsedHeight = 0;

	constructor(@Inject(DOCUMENT) private document: Document, private cdr: ChangeDetectorRef) {}

	public ngOnInit(): void {
		this.lineHeight = parseFloat(
			this.document.defaultView?.getComputedStyle(this.text.nativeElement).getPropertyValue('line-height') || '22'
		);
	}

	public ngAfterViewChecked(): void {
		this.checkHeight();
	}

	private checkHeight(): void {
		this.collapsedHeight = this.lineHeight * this.numberOfLines;
		const prev = this.buttonShowed;
		this.buttonShowed = this.text.nativeElement.scrollHeight > this.collapsedHeight;

		if (prev !== this.buttonShowed) {
			this.cdr.detectChanges();
		}
	}
}
