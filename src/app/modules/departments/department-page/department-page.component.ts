import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Icons } from '@shared/modules/icons/icons';
import { SelectedDepartmentService } from '../department-id-route-container/selected-department.service';

@Component({
	selector: 'do-department-page',
	templateUrl: './department-page.component.html',
	styleUrls: ['./department-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DepartmentPageComponent {
	public readonly Icons = Icons;

	public state$ = this.departmentPageState.departmentState$;

	constructor(private departmentPageState: SelectedDepartmentService) {}
}
