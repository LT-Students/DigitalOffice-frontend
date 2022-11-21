import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Icons } from '@shared/modules/icons/icons';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'do-back-navigation',
	templateUrl: './back-navigation.component.html',
	styleUrls: ['./back-navigation.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BackNavigationComponent {
	public readonly Icons = Icons;

	constructor(private router: Router, private route: ActivatedRoute) {}

	public handleBackNavigation(): void {
		this.router.navigate(['..'], { relativeTo: this.route });
	}
}
