import { setProperty } from '@app/utils/utils';
import { ImageInfo } from '@data/api/company-service/models/image-info';
import { SmtpInfo } from '@data/api/company-service/models/smtp-info';
import { DepartmentInfo } from '@data/api/company-service/models/department-info';
import { PositionInfo } from '@data/api/company-service/models/position-info';
import { OfficeInfo } from '@data/api/company-service/models/office-info';

export interface CompanyInfo {
	id?: string | null;
	portalName?: string | null;
	companyName?: string | null;
	description?: string | null;
	tagline?: string | null;
	siteUrl?: string | null;
	logo?: ImageInfo | null;
	smtpInfo?: SmtpInfo | null;
	departments?: DepartmentInfo[] | null;
	positions?: PositionInfo[] | null;
	offices?: OfficeInfo[] | null;
	IsDepartmentModuleEnabled?: boolean | null;
}

export class Company implements CompanyInfo {
	public id: string | null | undefined;
	public portalName: string | null | undefined;
	public companyName: string | null | undefined;
	public description: string | null | undefined;
	public tagline: string | null | undefined;
	public siteUrl: string | null | undefined;
	public logo: ImageInfo | null | undefined;
	public smtpInfo: SmtpInfo | null | undefined;
	public departments: DepartmentInfo[] | null | undefined;
	public positions: PositionInfo[] | null | undefined;
	public offices: OfficeInfo[] | null | undefined;
	public IsDepartmentModuleEnabled: boolean | null | undefined;

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
		this.IsDepartmentModuleEnabled = setProperty(data.IsDepartmentModuleEnabled);
	}

	/* methods */
}

