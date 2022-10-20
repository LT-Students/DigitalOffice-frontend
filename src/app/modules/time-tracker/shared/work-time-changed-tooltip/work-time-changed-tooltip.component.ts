import { ChangeDetectionStrategy, Component, Input, ViewChild } from '@angular/core';
import { PopoverComponent } from '@shared/component/popover/popover.component';

interface User {
	firstName: string;
	lastName: string;
}

interface TooltipData {
	managerHours: number;
	userHours: number;
	manager: User;
	user: User;
}

@Component({
	selector: 'do-work-time-changed-tooltip',
	template: `
		<do-popover>
			<span class="mat-body-2">Автор изменений</span>
			<p>
				{{ tooltipData.manager | fullName: false:true }} {{ tooltipData.managerHours | i18nPlural: pluralCase }}
			</p>
			<span class="mat-body-2">Данные сотрудника</span>
			<p>{{ tooltipData.user | fullName: false:true }} {{ tooltipData.userHours | i18nPlural: pluralCase }}</p>
		</do-popover>
	`,
	styles: [],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkTimeChangedTooltipComponent {
	@ViewChild(PopoverComponent, { static: true }) template!: PopoverComponent;
	@Input() tooltipData!: TooltipData;

	public readonly pluralCase = {
		one: '# час',
		few: '# часа',
		other: '# часов',
	};

	constructor() {}
}
