/* tslint:disable */
/* eslint-disable */
import { EducationType } from './education-type';
import { ImageContent } from './image-content';
export interface CreateCertificateRequest {
	educationType: EducationType;

	/**
	 * Array of certificate images.
	 */
	images?: Array<ImageContent>;

	/**
	 * Certificate name.
	 */
	name: string;

	/**
	 * Date of issue of the certificate.
	 */
	receivedAt: string;

	/**
	 * Name of school.
	 */
	schoolName: string;

	/**
	 * Unique user identifier.
	 */
	userId: string;
}
