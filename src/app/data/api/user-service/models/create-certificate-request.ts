/* tslint:disable */
/* eslint-disable */
import { AddImageRequest } from './add-image-request';
import { EducationType } from './education-type';
export interface CreateCertificateRequest {
	educationType: EducationType;

	/**
	 * Array of certificate images.
	 */
	images?: Array<AddImageRequest>;

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
