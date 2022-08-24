import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DepartmentResponse } from '@api/department-service/models/department-response';
import {
	TIMELIST_ENTITY_INFO,
	TimelistEntityInfo,
	TimelistEntityType,
} from '../../../manager-timelist/models/timelist-entity';

function resolveTimelistEntityInfo(route: ActivatedRoute): TimelistEntityInfo {
	const { id, name } = route.snapshot.data['department'] as DepartmentResponse;
	return { entityId: id, name, entityType: TimelistEntityType.Department };
}

@Component({
	selector: 'do-department-id-route-container',
	template: `<router-outlet></router-outlet>`,
	styles: [],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [{ provide: TIMELIST_ENTITY_INFO, useFactory: resolveTimelistEntityInfo, deps: [ActivatedRoute] }],
})
export class DepartmentIdRouteContainerComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {}
}
