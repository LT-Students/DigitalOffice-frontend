import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { map } from 'rxjs/operators';
import { DepartmentPageStateService } from '../../department-id-route-container/department-page-state.service';
import { Department } from '../department';

@Component({
	selector: 'do-department-description',
	template: `
		<mat-card class="description">{{ description$ | async | placeholder: 'Описание отсутствует' }}</mat-card>
	`,
	styles: [],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DepartmentOverviewComponent implements OnInit {
	public description$ = this.departmentState.department$.pipe(map((d: Department) => d.description));

	constructor(private departmentState: DepartmentPageStateService) {}

	ngOnInit(): void {}
}
