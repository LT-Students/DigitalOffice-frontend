import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Icons } from '@shared/modules/icons/icons';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
	selector: 'do-department-page',
	templateUrl: './department-page.component.html',
	styleUrls: ['./department-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DepartmentPageComponent {
	public readonly Icons = Icons;

	public department$ = this.route.data.pipe(map((data) => data['department']));

	constructor(private route: ActivatedRoute) {}
}
