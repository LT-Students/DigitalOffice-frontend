/* tslint:disable */
/* eslint-disable */
import { FileAccess } from './file-access';
import { ImageInfo } from './image-info';
import { ProjectInfo } from './project-info';
export interface ProjectResponse {
	files?: Array<FileAccess>;
	images?: Array<ImageInfo>;
	project: ProjectInfo;
	usersIds?: Array<string>;
}
