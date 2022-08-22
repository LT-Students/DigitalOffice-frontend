/* tslint:disable */
/* eslint-disable */
export interface InstallAppRequest {
	adminInfo: {
		FirstName: string;
		LastName: string;
		MiddleName?: string;
		Email: string;
		Login: string;
		Password: string;
	};
	guiInfo: { PortalName?: string; LogoContent?: string; LogoExtension?: string; SiteUrl: string };
	servicesToDisable: Array<string>;
	smtpInfo: { Host: string; Port: number; EnableSsl: boolean; Email: string; Password: string };
}
