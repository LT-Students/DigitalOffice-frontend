import { setProperty } from '@app/utils/utils';
import { ImageInfo } from '@api/company-service/models/image-info';
import { SmtpInfo } from '@api/company-service/models/smtp-info';
import { DepartmentInfo } from '@api/company-service/models/department-info';
import { PositionInfo } from '@api/company-service/models/position-info';
import { OfficeInfo } from '@api/company-service/models/office-info';

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
	public id: string | null;
	public portalName: string;
	public companyName: string;
	public description: string | null;
	public tagline: string | null;
	public siteUrl: string | null;
	public logo: ImageInfo | null;
	public smtpInfo: SmtpInfo | null;
	public departments: DepartmentInfo[] | null;
	public positions: PositionInfo[] | null;
	public offices: OfficeInfo[] | null;
	public IsDepartmentModuleEnabled: boolean | null;

	constructor(data?: CompanyInfo) {
		this.id = setProperty(data?.id);
		this.portalName = setProperty(data?.portalName) ?? 'Portal Name';
		this.companyName = setProperty(data?.companyName) ?? 'Company Name';
		this.description = setProperty(data?.description);
		this.tagline = setProperty(data?.tagline);
		this.siteUrl = setProperty(data?.siteUrl);
		this.logo = setProperty(data?.logo);
		this.smtpInfo = setProperty(data?.smtpInfo);
		this.departments = setProperty(data?.departments);
		this.positions = setProperty(data?.positions);
		this.offices = setProperty(data?.offices);
		this.IsDepartmentModuleEnabled = setProperty(data?.IsDepartmentModuleEnabled);
	}

	/* methods */
}
