/* tslint:disable */
/* eslint-disable */
import { ImageType } from './image-type';
import { OperationResultStatusType } from './operation-result-status-type';
export interface OperationResultResponseImageInfo {
	body?: { id?: string; parentId?: string; type?: ImageType; name?: string; content?: string; extension?: string };
	errors?: Array<string>;
	status?: OperationResultStatusType;
}
