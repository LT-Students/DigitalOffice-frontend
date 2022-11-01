import { ChangeDetectionStrategy, Component, TemplateRef, ViewChild } from '@angular/core';

@Component({
	selector: 'do-popover',
	templateUrl: './popover.component.html',
	styleUrls: ['./popover.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopoverComponent {
	@ViewChild(TemplateRef) templateRef!: TemplateRef<any>;

	constructor() {}
}
