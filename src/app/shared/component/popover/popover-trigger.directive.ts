import { Directive, ElementRef, HostListener, Input, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { ConnectedPosition, Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { PopoverComponent } from '@shared/component/popover/popover.component';
import { Positions } from '@shared/component/popover/positions';

type PopoverPosition = 'above' | 'below' | 'after' | 'before';

@Directive({
	selector: '[doPopoverTrigger]',
})
export class PopoverTriggerDirective implements OnInit, OnDestroy {
	@Input() doPopoverTrigger!: PopoverComponent;
	@Input() position: PopoverPosition = 'above';

	private overlayRef!: OverlayRef;

	constructor(private elementRef: ElementRef, private overlay: Overlay, private vcr: ViewContainerRef) {}

	@HostListener('mouseenter') onMouseEnter() {
		if (!this.overlayRef.hasAttached()) {
			const portal = new TemplatePortal(this.doPopoverTrigger.templateRef, this.vcr);
			this.overlayRef.attach(portal);
		}
	}

	@HostListener('mouseleave') onMouseLeave() {
		if (this.overlayRef.hasAttached()) {
			this.overlayRef.detach();
		}
	}

	public ngOnInit(): void {
		this.createOverlay();
	}

	public ngOnDestroy(): void {
		this.overlayRef.dispose();
	}

	private createOverlay(): void {
		const scrollStrategy = this.overlay.scrollStrategies.block();
		const positionStrategy = this.overlay
			.position()
			.flexibleConnectedTo(this.elementRef)
			.withPositions(this.getPositions());
		this.overlayRef = this.overlay.create({
			scrollStrategy,
			positionStrategy,
		});
	}

	private getPositions(): ConnectedPosition[] {
		switch (this.position) {
			case 'above':
				return [Positions.ABOVE, Positions.BELOW];
			case 'below':
				return [Positions.BELOW, Positions.ABOVE];
			case 'after':
				return [Positions.AFTER, Positions.BEFORE];
			case 'before':
				return [Positions.BEFORE, Positions.AFTER];
			default:
				return [];
		}
	}
}
