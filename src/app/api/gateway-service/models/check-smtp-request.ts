/* tslint:disable */
/* eslint-disable */
export interface CheckSmtpRequest {
	adminEmail: string;
	smtpInfo: {
		Host: string;
		Port: number;
		EnableSsl: boolean;
		Email: string;
		Password: string;
	};
}
