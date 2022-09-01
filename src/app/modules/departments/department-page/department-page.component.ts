import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Icons } from '@shared/modules/icons/icons';
import { DepartmentPageStateService } from '../department-id-route-container/department-page-state.service';

@Component({
	selector: 'do-department-page',
	templateUrl: './department-page.component.html',
	styleUrls: ['./department-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DepartmentPageComponent {
	public readonly Icons = Icons;

	public state$ = this.departmentPageState.departmentState$;

	constructor(private departmentPageState: DepartmentPageStateService) {}
}
