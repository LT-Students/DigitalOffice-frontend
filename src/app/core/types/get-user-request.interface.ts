export interface IGetUserRequest {
	/**
	 * User global unique identifier.
	 */
	userId?: string;

	/**
	 * User first or last name.
	 */
	name?: string;
	/**
	 * Any of user emails. Can not be used with &#x60;includecommunications&#x60;.
	 */
	email?: string;
	/**
	 * Include user communications info in answer.
	 */
	includecommunications?: boolean;
	/**
	 * Include user certificates info in answer.
	 */
	includecertificates?: boolean;
	/**
	 * Include user achievements info in answer.
	 */
	includeachievements?: boolean;
	/**
	 * Include user department info in answer.
	 */
	includedepartment?: boolean;
	/**
	 * Include user position info in answer.
	 */
	includeposition?: boolean;
	/**
	 * Include user office info in answer.
	 */
	includeoffice?: boolean;
	/**
	 * Include user role info in answer.
	 */
	includerole?: boolean;
	/**
	 * Include user skills info in answer.
	 */
	includeskills?: boolean;
	/**
	 * Include user projects info in answer.
	 */
	includeprojects?: boolean;
	/**
	 * Include images content in answer.
	 */
	includeimages?: boolean;
	includeuserimages?: boolean;
	/**
	 * Include educations info in answer.
	 */
	includeeducations?: boolean;
	/**
	 * Include avatar info in answer.
	 */
	includecurrentavatar?: boolean;
	includecompany?: boolean;
}
