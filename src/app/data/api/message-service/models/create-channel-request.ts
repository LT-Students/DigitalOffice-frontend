/* tslint:disable */
/* eslint-disable */
import { CreateChannelUserRequest } from './create-channel-user-request';
import { ImageConsist } from './image-consist';
export interface CreateChannelRequest {
	image?: ImageConsist;
	isPrivate: boolean;

	/**
	 * The channel name.
	 */
	name: string;
	users: Array<CreateChannelUserRequest>;

	/**
	 * The workspase unique identifier.
	 */
	workspaceId: string;
}
