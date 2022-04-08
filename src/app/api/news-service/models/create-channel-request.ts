/* tslint:disable */
/* eslint-disable */
import { ImageConsist } from './image-consist';
export interface CreateChannelRequest {
	image?: null | ImageConsist;

	/**
	 * The channels' name.
	 */
	name: string;
	pinnedMessage?: string;
	pinnedNewsId?: string;
}
