/* tslint:disable */
/* eslint-disable */
import { ImageConsist } from './image-consist';
export interface CreateAchievementRequest {
	/**
	 * Description of the achievment.
	 */
	description?: null | string;
	image?: ImageConsist;

	/**
	 * Unique name of the achievement.
	 */
	name: string;
}
