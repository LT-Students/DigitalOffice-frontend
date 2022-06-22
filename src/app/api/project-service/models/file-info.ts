/* tslint:disable */
/* eslint-disable */
import { AccessType } from './access-type';
export interface FileInfo {
	access: AccessType;

	/**
	 * File content.
	 */
	content: string;

	/**
	 * Extension of the file.
	 */
	extension: string;

	/**
	 * Name of the file.
	 */
	name?: string;
}
