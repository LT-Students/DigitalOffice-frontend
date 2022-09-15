import { ChangeDetectionStrategy, Component, Input, TemplateRef, ViewChild } from '@angular/core';

@Component({
	selector: 'do-option',
	template: `<ng-template><ng-content></ng-content></ng-template>`,
	styles: [],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OptionComponent {
	@ViewChild(TemplateRef, { static: true }) template!: TemplateRef<any>;
	@Input() value: any;

	constructor() {}
}
