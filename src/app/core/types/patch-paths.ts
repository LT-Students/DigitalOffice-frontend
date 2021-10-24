export type PatchRequest<T extends string> = { [key in T]?: any };
export type LeaveTimePath = '/Minutes' | '/StartTime' | '/EndTime' | '/LeaveType' | '/Comment' | '/IsActive';
export type UserPath =
	| '/FirstName'
	| '/LastName'
	| '/MiddleName'
	| '/Gender'
	| '/DateOfBirth'
	| '/City'
	| '/AvatarFileId'
	| '/Status'
	| '/StartWorkingAt'
	| '/Rate'
	| '/DepartmentId'
	| '/PositionId'
	| '/RoleId'
	| '/OfficeId'
	| '/About'
	| '/IsActive';
