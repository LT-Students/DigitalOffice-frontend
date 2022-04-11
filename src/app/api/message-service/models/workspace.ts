/* tslint:disable */
/* eslint-disable */
import { ImageInfo } from './image-info';
export interface Workspace {
	/**
	 * The workspace description.
	 */
	description?: string;
	image?: ImageInfo;

	/**
	 * The workspace name.
	 */
	name: string;
}
