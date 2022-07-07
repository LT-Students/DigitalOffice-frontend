export type FormDataEditRequest<T extends PatchPath> = { [key in T]?: any };
export type InitialDataEditRequest<T extends PatchPath> = FormDataEditRequest<T>;

export type EditRequest<T extends PatchPath> = PatchDocument<T>[];

type PatchOperation = 'replace';
export class PatchDocument<T extends PatchPath> {
	public op: PatchOperation = 'replace';
	constructor(public value: any, public path: T) {}
}

export type PatchPath =
	| UserPath
	| OfficePath
	| LeaveTimePath
	| WorkTimePath
	| ProjectPath
	| DepartmentPath
	| PositionPath
	| CompanyPath;

export enum CompanyPath {
	COMPANY_NAME = '/name',
	TAGLINE = '/tagline',
	DESCRIPTION = '/description',
	LOGO = '/logo',
	CONTACTS = '/contacts',
}

export enum LeaveTimePath {
	MINUTES = '/Minutes',
	START_TIME = '/StartTime',
	END_TIME = '/EndTime',
	LEAVE_TYPE = '/LeaveType',
	COMMENT = '/Comment',
	IS_ACTIVE = '/IsActive',
}

export enum WorkTimePath {
	Hours = '/Hours',
	Description = '/Description',
}

export enum ProjectPath {
	NAME = '/Name',
	SHORT_NAME = '/ShortName',
	DESCRIPTION = '/Description',
	SHORT_DESCRIPTION = '/ShortDescription',
	STATUS = '/Status',
	CUSTOMER = '/Customer',
	START_PROJECT = '/StartProject',
	END_PROJECT = '/EndProject',
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
	DATE_OF_BIRTH = '/DateOfBirth',
	// START_WORKING_AT = '/StartWorkingAt',
	ABOUT = '/About',
	IS_ADMIN = '/IsAdmin',
	GENDER_ID = '/GenderId',
	BUSINESS_HOURS_FROM_UTC = '/BusinessHoursFromUtc',
	BUSINESS_HOURS_TO_UTC = '/BusinessHoursToUtc',
	LATITUDE = '/Latitude',
	LONGITUDE = '/Longitude',
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
	SHORT_NAME = '/shortName',
	DESCRIPTION = '/description',
	IS_ACTIVE = '/isactive',
}
