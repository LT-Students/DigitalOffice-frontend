/* tslint:disable */
/* eslint-disable */
import { ImageConsist } from './image-consist';
export interface ChannelInfo {
	id: string;
	image?: null | ImageConsist;
	name: string;
	pinnedMessage?: string;
	pinnedNewsId?: null | string;
}
