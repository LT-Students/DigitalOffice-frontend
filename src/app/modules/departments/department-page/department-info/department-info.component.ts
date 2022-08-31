import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Icons } from '@shared/modules/icons/icons';
import { Department } from '../department';
import { DepartmentsRoutes } from '../../models/departments-routes';

@Component({
	selector: 'do-department-info',
	templateUrl: './department-info.component.html',
	styleUrls: ['./department-info.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DepartmentInfoComponent implements OnInit {
	public readonly Icons = Icons;
	public readonly DepartmentsRoutes = DepartmentsRoutes;

	@Input() department!: Department;

	constructor() {}

	ngOnInit(): void {}
}
