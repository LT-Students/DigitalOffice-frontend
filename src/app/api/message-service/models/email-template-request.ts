/* tslint:disable */
/* eslint-disable */
import { EmailTemplateTextInfo } from './email-template-text-info';
import { EmailTemplateType } from './email-template-type';
export interface EmailTemplateRequest {
	/**
	 * Id of the email template author.
	 */
	authorId: string;
	emailTemplateTexts?: EmailTemplateTextInfo;

	/**
	 * Email template name.
	 */
	name: string;
	type?: EmailTemplateType;
}
