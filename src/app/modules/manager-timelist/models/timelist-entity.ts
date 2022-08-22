import { InjectionToken } from '@angular/core';

export enum TimelistEntityType {
	Project,
	Department,
}

export interface TimelistEntityInfo {
	entityType: TimelistEntityType;
	entityId: string;
	name: string;
}

export const TIMELIST_ENTITY_INFO = new InjectionToken<TimelistEntityInfo>('Timelist entity info');
