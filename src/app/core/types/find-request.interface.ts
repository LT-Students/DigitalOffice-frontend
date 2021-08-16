//@ts-nocheck
export interface IFindRequest {
	/**
	 * Number to skip.
	 */
	skipCount: number;

	/**
	 * Number to take.
	 */
	takeCount: number;
}

export interface IFindRequestEx extends IFindRequest {
	/**
	 * If it is true, response will be have deactivated records.
	 */
	includeDeactivated?: boolean;
}
