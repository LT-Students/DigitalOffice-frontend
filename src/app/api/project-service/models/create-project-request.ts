/* tslint:disable */
/* eslint-disable */
import { ImageContent } from './image-content';
import { ProjectStatusType } from './project-status-type';
import { UserRequest } from './user-request';
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
	 * Date and time finish project in UTC.
	 */
	endDateUtc?: any;

	/**
	 * Project name.
	 */
	name: string;
	projectImages: Array<ImageContent>;

	/**
	 * Project short description.
	 */
	shortDescription?: string;

	/**
	 * Project short name.
	 */
	shortName: string;

	/**
	 * Date and time begin project in UTC.
	 */
	startDateUtc: any;
	status: ProjectStatusType;
	users: Array<UserRequest>;
}
