/* tslint:disable */
/* eslint-disable */
import { ImageConsist } from './image-consist';
export interface CreateCompanyRequest {
	contacts?: string;
	description?: string;
	logo?: ImageConsist;
	name: string;
	tagline?: string;
}
