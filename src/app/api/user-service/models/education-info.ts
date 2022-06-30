/* tslint:disable */
/* eslint-disable */
import { EducationFormInfo } from './education-form-info';
import { EducationTypeInfo } from './education-type-info';
export interface EducationInfo {
	admissionAt?: string;
	completeness?: string;
	educationForm?: EducationFormInfo;
	educationType?: EducationTypeInfo;
	id: string;
	imagesIds?: Array<string>;
	issueAt?: string;
	qualificationName: string;
	universityName: string;
}
