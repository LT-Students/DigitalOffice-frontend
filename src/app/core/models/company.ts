import { OfficeInfo } from '@api/company-service/models/office-info';
import { ImageConsist } from '@api/company-service/models/image-consist';
import { CompanyResponse } from '@api/company-service/models/company-response';

export class Company implements CompanyResponse {
	id: string;
	name: string;
	description?: string;
	tagline?: string;
	contacts?: string;
	logo?: ImageConsist;
	offices?: Array<OfficeInfo>;

	constructor(data: CompanyResponse) {
		this.id = data?.id;
		this.name = data?.name;
		this.description = data?.description;
		this.tagline = data?.tagline;
		this.offices = data?.offices;
		this.contacts = data?.contacts;
		this.logo = data?.logo;
	}
}
