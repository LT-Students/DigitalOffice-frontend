/* tslint:disable */
/* eslint-disable */
import { CreateUserRequest } from './create-user-request';
import { FileContent } from './file-content';
import { ImageContent } from './image-content';
import { ProjectStatusType } from './project-status-type';
export interface CreateProjectRequest {
	/**
	 * Unique department identifier.
	 */
	departmentId?: string;

	/**
	 * Project description.
	 */
	description?: string;
	files?: Array<FileContent>;

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
	users?: Array<CreateUserRequest>;
}
