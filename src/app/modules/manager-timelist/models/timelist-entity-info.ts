import { InjectionToken } from '@angular/core';

export interface TimelistEntityInfo {
	entityId: string;
	name: string;
}

export const TIMELIST_ENTITY_INFO = new InjectionToken<TimelistEntityInfo>('Timelist entity info');
