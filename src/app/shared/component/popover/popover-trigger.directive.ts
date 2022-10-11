import { Directive, ElementRef, HostListener, Input, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { ConnectedPosition, Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { PopoverComponent } from '@shared/component/popover/popover.component';
import { Positions } from '@shared/component/popover/positions';

type PopoverPosition = 'above' | 'below' | 'after' | 'before';

@Directive({
	selector: '[doPopoverTrigger]',
	exportAs: 'doPopoverTrigger',
})
export class PopoverTriggerDirective implements OnInit, OnDestroy {
	@Input() doPopoverTrigger!: PopoverComponent;
	@Input() position: PopoverPosition = 'above';
	@Input() disableHoverEvent = false;

	private overlayRef!: OverlayRef;

	constructor(private elementRef: ElementRef, private overlay: Overlay, private vcr: ViewContainerRef) {}

	@HostListener('mouseenter') private onMouseEnter() {
		if (this.disableHoverEvent) {
			return;
		}
		this.attachPopover();
	}

	@HostListener('mouseleave') private onMouseLeave() {
		if (this.disableHoverEvent) {
			return;
		}
		this.detachPopover();
	}

	public ngOnInit(): void {
		this.createOverlay();
	}

	public ngOnDestroy(): void {
		this.overlayRef.dispose();
	}

	public show(): void {
		this.attachPopover();
	}

	public hide(): void {
		this.detachPopover();
	}

	private attachPopover(): void {
		if (!this.overlayRef.hasAttached()) {
			const portal = new TemplatePortal(this.doPopoverTrigger.templateRef, this.vcr);
			this.overlayRef.attach(portal);
		}
	}

	private detachPopover(): void {
		if (this.overlayRef.hasAttached()) {
			this.overlayRef.detach();
		}
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
				return [
					{ ...Positions.AFTER, offsetX: 16 },
					{ ...Positions.BEFORE, offsetX: -16 },
				];
			case 'before':
				return [
					{ ...Positions.BEFORE, offsetX: -16 },
					{ ...Positions.AFTER, offsetX: 16 },
				];
			default:
				return [];
		}
	}
}
