/* tslint:disable */
/* eslint-disable */
import { FormEducation } from './form-education';
export interface CreateEducationRequest {
	/**
	 * Date of admission.
	 */
	admissionAt: string;
	formEducation: FormEducation;

	/**
	 * Date of issuue.
	 */
	issueAt?: string;

	/**
	 * Name of qualification.
	 */
	qualificationName: string;

	/**
	 * Name of the univerity.
	 */
	universityName: string;

	/**
	 * Unique user identifier.
	 */
	userId: string;
}
