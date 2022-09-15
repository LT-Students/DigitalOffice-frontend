export interface WithPagination {
	/**
	 * Number of elements to skip.
	 */
	skipCount: number;

	/**
	 * Number of elements to take.
	 */
	takeCount: number;
}

export interface IFindRequestEx extends WithPagination {
	/**
	 * If it is true, response will have deactivated records.
	 */
	includeDeactivated?: boolean;
}
