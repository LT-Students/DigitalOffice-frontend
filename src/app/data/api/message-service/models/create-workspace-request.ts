/* tslint:disable */
/* eslint-disable */
import { ImageConsist } from './image-consist';
import { WorkspaceUserRequest } from './workspace-user-request';
export interface CreateWorkspaceRequest {
	/**
	 * The workspace description.
	 */
	description?: string;
	image?: ImageConsist;

	/**
	 * The workspace name.
	 */
	name: string;
	users: Array<WorkspaceUserRequest>;
}
