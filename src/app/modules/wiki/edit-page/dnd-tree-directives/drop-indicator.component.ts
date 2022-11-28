import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, Input } from '@angular/core';
import { DropPosition } from './tree-node-drag.directive';

@Component({
	selector: 'do-drop-indicator',
	template: ``,
	styles: [
		`
			:host {
				pointer-events: none;
				display: block;
				position: absolute;
				border-left: 5px solid red;
				border-top: 3px solid transparent;
				border-bottom: 3px solid transparent;
				width: 100%;

				&::after {
					content: '';
					border-bottom: 1px solid red;
					width: 100%;
					position: absolute;
					top: -0.5px;
					left: -1px;
				}
			}
		`,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropIndicatorComponent {
	@HostBinding('style') style: { [key: string]: any } = {};

	@Input() set dropPosition(dropPosition: DropPosition) {
		switch (dropPosition) {
			case DropPosition.Down:
				this.style = { bottom: '-5px' };
				break;
			case DropPosition.Up:
				this.style = { top: '-5px' };
				break;
			default:
				break;
		}
		this.cdr.markForCheck();
	}

	constructor(private cdr: ChangeDetectorRef) {}
}
