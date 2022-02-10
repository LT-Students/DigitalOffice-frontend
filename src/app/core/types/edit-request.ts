export type FormDataEditRequest<T extends PatchPath> = { [key in T]?: any };
export type InitialDataEditRequest<T extends PatchPath> = FormDataEditRequest<T>;

export type EditRequest<T extends PatchPath> = PatchDocument<T>[];

export interface PatchDocument<T extends PatchPath> {
	op: 'replace';
	path: T;
	value: any;
}

export type PatchPath =
	| UserPath
	| OfficePath
	| LeaveTimePath
	| ProjectPath
	| DepartmentPath
	| PositionPath
	| CompanyPath;

export enum CompanyPath {
	PORTAL_NAME = '/portalname',
	COMPANY_NAME = '/companyname',
	SITE_URL = '/siteurl',
	TAGLINE = '/tagline',
	DESCRIPTION = '/description',
	LOGO = '/logo',
	HOST = '/host',
	PORT = '/port',
	ENABLE_SSL = '/enablessl',
	EMAIL = '/email',
	PASSWORD = '/password',
	DEPARTMENT_MODULE_ENABLED = '/isdepartmentmoduleenabled',
}

export enum LeaveTimePath {
	MINUTES = '/Minutes',
	START_TIME = '/StartTime',
	END_TIME = '/EndTime',
	LEAVE_TYPE = '/LeaveType',
	COMMENT = '/Comment',
	IS_ACTIVE = '/IsActive',
}

export enum ProjectPath {
	NAME = '/Name',
	SHORT_NAME = '/ShortName',
	DESCRIPTION = '/Description',
	SHORT_DESCRIPTION = '/ShortDescription',
	STATUS = '/Status',
	// DEPARTMENT_ID = '/DepartmentId',
}

export enum PositionPath {
	NAME = '/name',
	DESCRIPTION = '/description',
	IS_ACTIVE = '/isactive',
}

export enum UserPath {
	FIRST_NAME = '/FirstName',
	LAST_NAME = '/LastName',
	MIDDLE_NAME = '/MiddleName',
	GENDER_ID = '/GenderId',
	DATE_OF_BIRTH = '/DateOfBirth',
	STATUS = '/Status',
	ABOUT = '/About',
	IS_ACTIVE = '/IsActive',
	IS_ADMIN = '/IsAdmin',
	LATITUDE = '/Latitude',
	LONGITUDE = '/Longitude',
	BUSINESS_HOURS_FROM_UTC = '/BusinessHoursFromUtc',
	BUSINESS_HOURS_TO_UTC = '/BusinessHoursToUtc',
}

export enum OfficePath {
	NAME = '/Name',
	CITY = '/City',
	ADDRESS = '/Address',
	LATITUDE = '/Latitude',
	LONGITUDE = '/Longitude',
	IS_ACTIVE = '/IsActive',
}

export enum DepartmentPath {
	NAME = '/name',
	DESCRIPTION = '/description',
	IS_ACTIVE = '/isactive',
	DIRECTOR_ID = '/directorid',
}
