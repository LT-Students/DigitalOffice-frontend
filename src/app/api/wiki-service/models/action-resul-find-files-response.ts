/* tslint:disable */
/* eslint-disable */
import { FileInfo } from './file-info';

/**
 * Response object for action operations.
 */
export interface ActionResulFindFilesResponse {
	body: Array<FileInfo>;
	totalCount?: number;
}
