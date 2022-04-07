/* tslint:disable */
/* eslint-disable */
import { CreateUserRequest } from './create-user-request';
import { FileInfo } from './file-info';
import { ImageContent } from './image-content';
import { ProjectStatusType } from './project-status-type';
export interface CreateProjectRequest {
	/**
	 * Project customer name.
	 */
	customer?: string;

	/**
	 * Unique department identifier.
	 */
	departmentId?: string;

	/**
	 * Project description.
	 */
	description?: string;

	/**
	 * Date and time finish project.
	 */
	endProject?: any;
	files?: Array<FileInfo>;

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

	/**
	 * Date and time begin project.
	 */
	startProject?: any;
	status: ProjectStatusType;
	users?: Array<CreateUserRequest>;
}
