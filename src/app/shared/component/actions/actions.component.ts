import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'do-actions',
	template: `<ng-content select="[doButton],[mat-button],[mat-flat-button]"></ng-content>`,
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
export class ActionsComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {}
}
