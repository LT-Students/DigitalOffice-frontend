//@ts-nocheck
import { ProjectInfo } from '@api/project-service/models/project-info';
import { setProperty } from '@app/utils/utils';

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
