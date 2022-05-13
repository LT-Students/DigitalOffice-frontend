import { ProjectStatusType } from '@api/project-service/models/project-status-type';

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
	private static _projectTypes: IProjectStatusType[] = [
		{ type: ProjectStatusType.Active, name: ProjectStatusTypeRu.Active },
		{ type: ProjectStatusType.Closed, name: ProjectStatusTypeRu.Closed },
		{ type: ProjectStatusType.Suspend, name: ProjectStatusTypeRu.Suspend },
	];

	public static getProjectType(projectStatusType?: ProjectStatusType | string | undefined): IProjectStatusType | undefined {
		return this._projectTypes.find((status: IProjectStatusType) => status.type === projectStatusType);
	}

	public static getAllProjectTypes(): IProjectStatusType[] {
		return this._projectTypes.slice();
	}
}
