import { TaskInfo } from '@data/api/project-service/models/task-info';
import { UserTaskInfo } from '@data/api/project-service/models/user-task-info';
import { ProjectTaskInfo } from '@data/api/project-service/models/project-task-info';
import { setProperty } from '@app/utils/utils';

export interface ITask {
	id: string;
	userId: string;
	startDate: Date;
	endDate: Date;
	minutes: number;
	title: string;
	description: string;
	projectId: string;
	createdAt: Date;
	createdBy: string;
}

export class Task implements TaskInfo {
	public assignedTo: UserTaskInfo;
	public author: UserTaskInfo;
	public createdAt: any;
	public description: string;
	public id: string;
	public name: string;
	public number: number;
	public plannedMinutes: number;
	public priorityName: string;
	public project: ProjectTaskInfo;
	public statusName: string;
	public typeName: string;

	constructor(data: TaskInfo) {
		this.assignedTo = setProperty(data.assignedTo);
		this.author = setProperty(data.author);
		this.createdAt = setProperty(data.createdAt);
		this.description = setProperty(data.description);
		this.id = setProperty(data.id);
		this.name = setProperty(data.name);
		this.number = setProperty(data.number);
		this.plannedMinutes = setProperty(data.plannedMinutes);
		this.priorityName = setProperty(data.priorityName);
		this.project = setProperty(data.project);
		this.statusName = setProperty(data.statusName);
		this.typeName = setProperty(data.typeName);
	}

	/* methods */
}
