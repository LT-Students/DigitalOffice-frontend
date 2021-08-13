//@ts-nocheck
import { ProjectStatusType } from '@data/api/project-service/models/project-status-type';

export enum ProjectStatusTypeRu {
	Active = 'активный',
	Closed = 'завершен',
	Suspend = 'приостановлен',
}

export interface IProjectStatus {
	name: ProjectStatusTypeRu;
	type: ProjectStatusType;
}

export class ProjectStatus implements IProjectStatus {
	name: ProjectStatusTypeRu;
	type: ProjectStatusType;

	constructor(type: ProjectStatusType) {
		this.type = type;
		this.name =
			type === ProjectStatusType.Active
				? ProjectStatusTypeRu.Active
				: type === ProjectStatusType.Closed
				? ProjectStatusTypeRu.Closed
				: type === ProjectStatusType.Suspend
				? ProjectStatusTypeRu.Suspend
				: null;
	}
}
