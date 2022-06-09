/* tslint:disable */
/* eslint-disable */
import { DepartmentInfo } from './department-info';
import { ProjectStatusType } from './project-status-type';
export interface ProjectInfo {
	/**
	 * Data and time created project.
	 */
	createdAtUtc?: any;

	/**
	 * Unique project creator identifier.
	 */
	createdBy?: string;

	/**
	 * Project сustomer.
	 */
	customer?: null | string;
	department?: null | DepartmentInfo;

	/**
	 * Project description.
	 */
	description?: null | string;

	/**
	 * Date and time finished project in UTC.
	 */
	endDateUtc?: null | any;

	/**
	 * Unique project identifier.
	 */
	id?: string;

	/**
	 * Project name.
	 */
	name?: string;

	/**
	 * Project short description.
	 */
	shortDescription?: null | string;

	/**
	 * Project short name.
	 */
	shortName?: null | string;

	/**
	 * Date and time begin project in UTC.
	 */
	startDateUtc?: any;
	status?: ProjectStatusType;
}
