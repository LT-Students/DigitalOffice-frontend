export type FormDataEditRequest<T extends PatchPath> = { [key in T]?: any };
export type InitialDataEditRequest<T extends PatchPath> = FormDataEditRequest<T>;

export type EditRequest<T extends PatchPath> = PatchDocument<T>[];
export interface PatchDocument<T extends PatchPath> {
	op: 'replace';
	path: T;
	value: any;
}
export type PatchPath = UserPath | OfficePath | LeaveTimePath | ProjectPath | DepartmentPath;

export type LeaveTimePath = '/Minutes' | '/StartTime' | '/EndTime' | '/LeaveType' | '/Comment' | '/IsActive';

export enum PositionPath {
	NAME = '/name',
	DESCRIPTION = '/description',
	IS_ACTIVE = '/isactive',
}

export enum UserPath {
	FIRST_NAME = '/FirstName',
	LAST_NAME = '/LastName',
	MIDDLE_NAME = '/MiddleName',
	GENDER = '/Gender',
	DATE_OF_BIRTH = '/DateOfBirth',
	CITY = '/City',
	STATUS = '/Status',
	START_WORKING_AT = '/StartWorkingAt',
	ABOUT = '/About',
	IS_ACTIVE = '/IsActive',
}

export enum OfficePath {
	NAME = '/Name',
	CITY = '/City',
	ADDRESS = '/Address',
	LATITUDE = '/Latitude',
	LONGITUDE = '/Longitude',
}

export type ProjectPath = '/Name' | '/ShortName' | '/Description' | '/ShortDescription' | '/Status' | '/DepartmentId';
export type DepartmentPath = '/name' | '/description' | '/isactive' | '/directorid';
