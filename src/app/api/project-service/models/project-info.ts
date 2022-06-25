/* tslint:disable */
/* eslint-disable */
import { DepartmentInfo } from './department-info';
import { ProjectStatusType } from './project-status-type';
export interface ProjectInfo {
	/**
	 * Data and time created project.
	 */
	createdAtUtc: any;

	/**
	 * Unique project creator identifier.
	 */
	createdBy: string;

	/**
	 * Project сustomer.
	 */
	customer?: string;
	department?: DepartmentInfo;

	/**
	 * Project description.
	 */
	description?: string;

	/**
	 * Date and time finished project in UTC.
	 */
	endDateUtc?: string;

	/**
	 * Unique project identifier.
	 */
	id: string;

	/**
	 * Project name.
	 */
	name: string;

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
	startDateUtc: string;
	status: ProjectStatusType;

	/**
	 * Count of active users in project.
	 */
	usersCount: number;
}
