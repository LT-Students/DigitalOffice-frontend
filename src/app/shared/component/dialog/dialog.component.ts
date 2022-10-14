import {
	AfterViewChecked,
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	Inject,
	NgZone,
	OnInit,
	Optional,
	ViewChild,
} from '@angular/core';
import { CdkDialogContainer, DialogConfig, DialogRef } from '@angular/cdk/dialog';
import { FocusMonitor, FocusTrapFactory, InteractivityChecker } from '@angular/cdk/a11y';
import { DOCUMENT } from '@angular/common';
import { OverlayRef } from '@angular/cdk/overlay';
import { Subject } from 'rxjs';

@Component({
	selector: 'do-dialog',
	templateUrl: './dialog.component.html',
	styleUrls: ['./dialog.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogComponent<C extends DialogConfig = DialogConfig>
	extends CdkDialogContainer
	implements OnInit, AfterViewChecked
{
	@ViewChild('container') container!: ElementRef<HTMLDivElement>;
	public isIncreasedPadding = new Subject<boolean>();

	public backdropClick = new Subject();
	private overlayRef: OverlayRef;

	constructor(
		private dialogRef: DialogRef,
		_elementRef: ElementRef,
		_focusTrapFactory: FocusTrapFactory,
		@Optional() @Inject(DOCUMENT) _document: any,
		@Inject(DialogConfig) readonly _config: C,
		_interactivityChecker: InteractivityChecker,
		_ngZone: NgZone,
		_overlayRef: OverlayRef,
		_focusMonitor?: FocusMonitor
	) {
		super(
			_elementRef,
			_focusTrapFactory,
			_document,
			_config,
			_interactivityChecker,
			_ngZone,
			_overlayRef,
			_focusMonitor
		);
		this.overlayRef = _overlayRef;
	}

	public ngOnInit(): void {
		this.backdropClick.subscribe({
			next: () => this.simulateBackdropClick(),
		});
	}

	/**
	 * With vertical padding set to 48px, there's might be an unnecessary scroll even though dialog is fitted in
	 * the screen. So to fix this we set minimal padding to 10px and if pure container height is bigger than
	 * viewport height, then set vertical padding to 48px. Otherwise, set minimal padding to 10px;
	 */
	public ngAfterViewChecked(): void {
		const viewportHeight = window.innerHeight;
		const containerPaddingSum = parseFloat(getComputedStyle(this.container.nativeElement).padding) * 2;
		const containerHeight = this.container.nativeElement.clientHeight - containerPaddingSum;
		const isContainerBiggerThanViewport = containerHeight >= viewportHeight;
		this.isIncreasedPadding.next(isContainerBiggerThanViewport);
	}

	public handleCrossClick(): void {
		this.simulateBackdropClick();
	}

	public handleBackdropClick(event: Event, backdrop: HTMLDivElement) {
		if (event.target === backdrop) {
			this.backdropClick.next();
		}
	}

	private simulateBackdropClick(): void {
		this.overlayRef.backdropElement?.click();
	}
}
