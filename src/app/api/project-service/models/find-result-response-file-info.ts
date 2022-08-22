/* tslint:disable */
/* eslint-disable */
import { FileInfo } from './file-info';
export interface FindResultResponseFileInfo {
	body?: Array<FileInfo>;
	errors: Array<string>;

	/**
	 * Total number of finded by filter files.
	 */
	totalCount: number;
}
