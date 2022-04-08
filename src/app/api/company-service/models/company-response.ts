/* tslint:disable */
/* eslint-disable */
import { ImageConsist } from './image-consist';
import { OfficeInfo } from './office-info';
export interface CompanyResponse {
	contacts?: null | string;
	description?: null | string;
	id: string;
	logo?: null | ImageConsist;
	name: string;
	offices?: null | Array<OfficeInfo>;
	tagline?: null | string;
}
