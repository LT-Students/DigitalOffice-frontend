import { ProjectStatusType } from '@data/api/project-service/models/project-status-type';
import { ILeaveType } from '@app/models/time/leave-type.model';

export enum ProjectStatusTypeRu {
	Active = 'активный',
	Closed = 'завершен',
	Suspend = 'приостановлен',
}

export interface IProjectStatusType {
	type?: ProjectStatusType;
	name: ProjectStatusTypeRu;
}

export class ProjectTypeModel {
	public static _projectTypes: IProjectStatusType[] = [
		{ type: ProjectStatusType.Active, name: ProjectStatusTypeRu.Active },
		{ type: ProjectStatusType.Closed, name: ProjectStatusTypeRu.Closed },
		{ type: ProjectStatusType.Suspend, name: ProjectStatusTypeRu.Suspend },
	];

	public static getProjectType(projectStatusType?: ProjectStatusType | undefined): IProjectStatusType | undefined {
		return this._projectTypes.find((status: IProjectStatusType) => status.type === projectStatusType);
	}

	public static getAllProjectTypes(): IProjectStatusType[] {
		return this._projectTypes.slice();
	}
}
