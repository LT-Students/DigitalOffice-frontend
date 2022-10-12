import { ChangeDetectionStrategy, Component, ElementRef, Inject, NgZone, OnInit, Optional } from '@angular/core';
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
export class DialogComponent<C extends DialogConfig = DialogConfig> extends CdkDialogContainer implements OnInit {
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

	public handleCrossClick(): void {
		this.simulateBackdropClick();
	}

	private simulateBackdropClick(): void {
		this.overlayRef.backdropElement?.click();
	}
}
