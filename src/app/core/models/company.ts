import { setProperty } from '@app/utils/utils';
import { OfficeInfo } from '@api/company-service/models/office-info';
import { ImageConsist } from '@api/company-service/models/image-consist';

export interface CompanyInfo {
	id?: string;
	name?: string;
	description?: string;
	tagline?: string;
	contacts?: string;
	logo?: ImageConsist;
	offices?: Array<OfficeInfo>;
}

export class Company implements CompanyInfo {
	id?: string;
	name?: string;
	description?: string;
	tagline?: string;
	contacts?: string;
	logo?: ImageConsist;
	offices?: Array<OfficeInfo>;

	constructor(data: CompanyInfo) {
		this.id = data?.id;
		this.name = data?.name;
		this.description = data?.description;
		this.tagline = data?.tagline;
		this.offices = data?.offices;
		this.contacts = data?.contacts;
		this.logo = data?.logo;
	}
}
