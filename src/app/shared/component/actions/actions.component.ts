import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'do-actions',
	template: `<ng-content></ng-content>`,
	styles: [
		`
			do-actions {
				display: flex;
				justify-content: center;
				align-items: center;
				flex-wrap: wrap;

				> *:not(:last-child) {
					margin-right: 12px;
				}
			}
		`,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
})
export class ActionsComponent {
	constructor() {}
}
