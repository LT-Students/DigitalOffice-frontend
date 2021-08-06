export interface IGetCompanyRequest {

	/**
	 * Include departments info in answer.
	 */
	includedepartments?: boolean;

	/**
	 * Include positions info in answer.
	 */
	includepositions?: boolean;

	/**
	 * Include offices info in answer.
	 */
	includeoffices?: boolean;

	/**
	 * Include smtp credentials in answer.
	 */
	includesmtpcredentials?: boolean;
}
