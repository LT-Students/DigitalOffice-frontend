export type PatchRequest<T extends string> = { [key in T]?: any };
export type LeaveTimePath = '/Minutes' | '/StartTime' | '/EndTime' | '/LeaveType' | '/Comment' | '/IsActive';
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

export type ProjectPath = '/Name' | '/ShortName' | '/Description' | '/ShortDescription' | '/Status' | '/DepartmentId';
export type DepartmentPath = '/name' | '/description' | '/isactive' | '/directorid';
