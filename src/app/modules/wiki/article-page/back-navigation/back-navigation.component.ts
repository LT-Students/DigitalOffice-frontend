import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Icons } from '@shared/modules/icons/icons';

@Component({
	selector: 'do-back-navigation',
	templateUrl: './back-navigation.component.html',
	styleUrls: ['./back-navigation.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BackNavigationComponent {
	public readonly Icons = Icons;

	constructor() {}

	public handleBackNavigation(): void {}
}
