import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Icons } from '@shared/modules/icons/icons';
import { DepartmentPageStateService } from '../department-id-route-container/department-page-state.service';
import { DepartmentsRoutes } from '../models/departments-routes';

@Component({
	selector: 'do-department-page',
	templateUrl: './department-page.component.html',
	styleUrls: ['./department-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DepartmentPageComponent {
	public readonly Icons = Icons;

	public state$ = this.departmentPageState.state$;

	public navLinks = [
		{
			label: 'Команда',
			link: DepartmentsRoutes.Users,
			index: 0,
		},
		{
			label: 'Проекты',
			link: DepartmentsRoutes.Projects,
			index: 1,
		},
		{
			label: 'Общая информация',
			link: DepartmentsRoutes.Overview,
			index: 2,
		},
	];

	constructor(private departmentPageState: DepartmentPageStateService) {}
}
