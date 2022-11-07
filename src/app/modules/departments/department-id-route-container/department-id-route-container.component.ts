import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TIMELIST_ENTITY_INFO, TimelistEntityInfo, TimelistEntityType } from '../../manager-timelist/models';
import { Department } from '../department-page/department';
import { DepartmentPageStateService } from './department-page-state.service';

function resolveTimelistEntityInfo(route: ActivatedRoute): TimelistEntityInfo {
	const { id, name } = route.snapshot.data['department'] as Department;
	return { entityId: id, name, entityType: TimelistEntityType.Department };
}

@Component({
	selector: 'do-department-id-route-container',
	template: `<router-outlet></router-outlet>`,
	styles: [],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [{ provide: TIMELIST_ENTITY_INFO, useFactory: resolveTimelistEntityInfo, deps: [ActivatedRoute] }],
})
export class DepartmentIdRouteContainerComponent implements OnDestroy {
	constructor(private depState: DepartmentPageStateService) {}

	public ngOnDestroy(): void {
		this.depState.clearState();
	}
}
