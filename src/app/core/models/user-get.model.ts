export interface UserGet {
	userId: string;

	name?: string;

	email?: string;

	includecommunications?: boolean;

	includecertificates?: boolean;

	includeachievements?: boolean;

	includedepartment?: boolean;

	includeposition?: boolean;

	includeoffice?: boolean;

	includerole?: boolean;

	includeskills?: boolean;

	includeprojects?: boolean;

	includeimages?: boolean;

	includeeducations?: boolean;
}
