import { Contributor } from '@data/models/contributor';
import { Company } from '@app/models/company';
import { ITask } from '@app/models/task.model';
import { ProjectInfo } from '@data/api/project-service/models/project-info';
import { setProperty } from '@app/utils/utils';

/**
 * @deprecated The interface should not be used
 */
export interface ProjectModel {
	id: string;
	name: string;
	shortName: string;
	description: string;
	departmentId: string;
	isActive: boolean;
	tasks?: Partial<ITask>[];
	consumer?: Company;
	contributors?: Contributor[];
	historyDetails?: string;
}

export class Project implements ProjectInfo {
	public authorId;
	public createdAt;
	public department;
	public description;
	public id;
	public name;
	public shortDescription;
	public shortName;
	public status;

	constructor(data: ProjectInfo) {
		this.authorId = setProperty(data.authorId);
		this.createdAt = setProperty(data.createdAt);
		this.department = setProperty(data.department);
		this.description = setProperty(data.description);
		this.id = setProperty(data.id);
		this.name = setProperty(data.name);
		this.shortDescription = setProperty(data.shortDescription);
		this.shortName = setProperty(data.shortName);
		this.status = setProperty(data.status);
	}

	/* methods */
	// TODO: for type checking ONLY
	public getTasks(): any[] {
		return [];
	}
}
