//@ts-nocheck
import { setProperty } from '@app/utils/utils';
import { ImageInfo } from '@data/api/company-service/models/image-info';
import { SmtpInfo } from '@data/api/company-service/models/smtp-info';
import { DepartmentInfo } from '@data/api/company-service/models/department-info';
import { PositionInfo } from '@data/api/company-service/models/position-info';
import { OfficeInfo } from '@data/api/company-service/models/office-info';

export interface CompanyInfo {
	id?: string;
	portalName?: string;
	companyName?: string;
	description?: string;
	tagline?: string;
	siteUrl?: string;
	logo?: ImageInfo;
	smtpInfo?: SmtpInfo;
	departments?: DepartmentInfo[];
	positions?: PositionInfo[];
	offices?: OfficeInfo[];
}

export class Company implements CompanyInfo {
	public id: string;
	public portalName: string;
	public companyName: string;
	public description: string;
	public tagline: string;
	public siteUrl: string;
	public logo: ImageInfo;
	public smtpInfo: SmtpInfo;
	public departments: DepartmentInfo[];
	public positions: PositionInfo[];
	public offices: OfficeInfo[];

	constructor(data: CompanyInfo) {
		this.id = setProperty(data.id);
		this.portalName = setProperty(data.portalName);
		this.companyName = setProperty(data.companyName);
		this.description = setProperty(data.description);
		this.tagline = setProperty(data.tagline);
		this.siteUrl = setProperty(data.siteUrl);
		this.logo = setProperty(data.logo);
		this.smtpInfo = setProperty(data.smtpInfo);
		this.departments = setProperty(data.departments);
		this.positions = setProperty(data.positions);
		this.offices = setProperty(data.offices);
	}

	/* methods */
}

