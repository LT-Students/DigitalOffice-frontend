/* tslint:disable */
/* eslint-disable */
import { FileAccessType } from './file-access-type';
export interface FileInfo {
	'Access '?: FileAccessType;

	/**
	 * Date and time begin file in UTC.
	 */
	createdAtUtc: any;

	/**
	 * The file extension.
	 */
	extension: string;

	/**
	 * Unique file identifier.
	 */
	id: string;

	/**
	 * The file name.
	 */
	name: string;

	/**
	 * The file size.
	 */
	size: number;
}
