/* tslint:disable */
/* eslint-disable */
import { ProjectStatusType } from './project-status-type';
export interface ProjectInfo {
	/**
	 * Unique project identifier.
	 */
	id: string;

	/**
	 * Project name.
	 */
	name?: string;
	shortDescription?: string;

	/**
	 * Project short name.
	 */
	shortName?: string;
	status?: ProjectStatusType;
}
