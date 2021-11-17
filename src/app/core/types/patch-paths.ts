export type PatchRequest<T extends string> = { [key in T]?: any };
export type LeaveTimePath = '/Minutes' | '/StartTime' | '/EndTime' | '/LeaveType' | '/Comment' | '/IsActive';
export type UserPath =
	| '/FirstName'
	| '/LastName'
	| '/MiddleName'
	| '/Gender'
	| '/DateOfBirth'
	| '/City'
	// | '/AvatarFileId'
	| '/Status'
	| '/StartWorkingAt'
	// | '/RoleId'
	// | '/OfficeId'
	| '/About'
	| '/IsActive';

export type ProjectPath = '/Name' | '/ShortName' | '/Description' | '/ShortDescription' | '/Status' | '/DepartmentId';
export type DepartmentPath = '/name' | '/description' | '/isactive' | '/directorid';
