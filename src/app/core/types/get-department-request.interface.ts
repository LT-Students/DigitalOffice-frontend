//@ts-nocheck
export interface IGetDepartmentRequest {
	/**
	 * Department global unique identifier.
	 */
	departmentid: string;

	/**
	 * Response would include department users.
	 */
	includeusers?: boolean;

	/**
	 * Response would include department projects.
	 */
	includeprojects?: boolean;
}
