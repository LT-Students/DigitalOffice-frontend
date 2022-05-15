export interface IGetUserRequest {
	/**
	 * User global unique identifier.
	 */
	userId?: string;

	/**
	 * Any of user emails. Can not be used with &#x60;includecommunications&#x60;.
	 */
	email?: string;

	/**
	 * Include user current avatar in answer.
	 */
	includecurrentavatar?: boolean;

	/**
	 * Include all user current avatars in answer.
	 */
	includeavatars?: boolean;

	/**
	 * Include user certificates info in answer.
	 */
	includecertificates?: boolean;

	/**
	 * Include user communications info in answer.
	 */
	includecommunications?: boolean;

	/**
	 * Include user company info in answer.
	 */
	includecompany?: boolean;

	/**
	 * Include user department info in answer.
	 */
	includedepartment?: boolean;

	/**
	 * Include educations info in answer.
	 */
	includeeducations?: boolean;

	/**
	 * Include user office info in answer.
	 */
	includeoffice?: boolean;

	/**
	 * Include user position info in answer.
	 */
	includeposition?: boolean;

	/**
	 * Include user projects info in answer.
	 */
	includeprojects?: boolean;

	/**
	 * Include user role info in answer.
	 */
	includerole?: boolean;

	/**
	 * Include user skills info in answer.
	 */
	includeskills?: boolean;

	/**
	 * Role localization.
	 */
	locale?: string;
}
