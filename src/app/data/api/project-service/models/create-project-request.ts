/* tslint:disable */
/* eslint-disable */
import { ImageContent } from './image-content';
import { ProjectStatusType } from './project-status-type';
import { ProjectUserRequest } from './project-user-request';
export interface CreateProjectRequest {
	/**
	 * Unique department identifier.
	 */
	departmentId?: string;

	/**
	 * Project description.
	 */
	description?: string;

	/**
	 * Project name.
	 */
	name: string;
	projectImages?: Array<ImageContent>;

	/**
	 * Project short description.
	 */
	shortDescription?: string;

	/**
	 * Project short name.
	 */
	shortName?: string;
	status: ProjectStatusType;
	users?: Array<ProjectUserRequest>;
}
