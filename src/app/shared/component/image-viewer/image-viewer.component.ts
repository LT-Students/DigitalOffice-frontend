import {
	Component,
	OnInit,
	ChangeDetectionStrategy,
	Input,
	Output,
	EventEmitter,
	ViewChild,
	TemplateRef,
	ViewContainerRef,
	OnDestroy,
} from '@angular/core';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { DomSanitizer } from '@angular/platform-browser';
import { filter, first, takeUntil } from 'rxjs/operators';
import { BehaviorSubject, Subject } from 'rxjs';
import { coerceNumberProperty } from '@angular/cdk/coercion';

@Component({
	selector: 'do-image-viewer',
	templateUrl: './image-viewer.component.html',
	styleUrls: ['./image-viewer.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageViewerComponent implements OnInit, OnDestroy {
	@ViewChild('imageContent') imageContent!: TemplateRef<ImageViewerComponent>;
	@Output() viewerClosed = new EventEmitter();
	@Input() images: File[] = [];
	@Input()
	set selectedIndex(number: any) {
		this.selectedImage.next(coerceNumberProperty(number));
	}
	public selectedImage = new BehaviorSubject(0);

	private destroy$ = new Subject();

	constructor(
		private overlay: Overlay,
		private sanitizer: DomSanitizer,
		private viewContainerRef: ViewContainerRef
	) {}

	public ngOnInit(): void {}

	public ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}

	public openImage(): void {
		const overlayRef = this.overlay.create(this.getOverlayConfig());
		const portal = new TemplatePortal(this.imageContent, this.viewContainerRef);
		overlayRef.attach(portal);

		overlayRef
			.backdropClick()
			.pipe(first(), takeUntil(this.destroy$))
			.subscribe({
				next: () => overlayRef.detach(),
			});
		overlayRef
			.keydownEvents()
			.pipe(
				filter((e: KeyboardEvent) => e.key === 'Escape'),
				first(),
				takeUntil(this.destroy$)
			)
			.subscribe({ next: () => overlayRef.detach() });
		overlayRef
			.keydownEvents()
			.pipe(
				filter((e: KeyboardEvent) => e.key === 'ArrowRight' || e.key === 'ArrowLeft'),
				takeUntil(this.destroy$)
			)
			.subscribe({
				next: (e: KeyboardEvent) => {
					switch (e.key) {
						case 'ArrowRight':
							this.incrementIndex();
							break;
						case 'ArrowLeft':
							this.decrementIndex();
							break;
						default:
							break;
					}
				},
			});
	}

	private incrementIndex(): void {
		const oldIndex = this.selectedImage.value;
		if (oldIndex < this.images.length - 1) {
			this.selectedImage.next(oldIndex + 1);
		}
	}

	private decrementIndex(): void {
		const oldIndex = this.selectedImage.value;
		if (oldIndex > 0) {
			this.selectedImage.next(oldIndex - 1);
		}
	}

	private getOverlayConfig(): OverlayConfig {
		return {
			positionStrategy: this.overlay.position().global().centerVertically().centerHorizontally(),
			hasBackdrop: true,
			backdropClass: ['cdk-overlay-backdrop', 'cdk-overlay-dark-backdrop', 'cdk-overlay-backdrop-showing'],
		};
	}
}
