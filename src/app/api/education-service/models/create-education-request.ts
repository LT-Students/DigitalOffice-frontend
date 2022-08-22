/* tslint:disable */
/* eslint-disable */
import { EducationCompleteness } from './education-completeness';
export interface CreateEducationRequest {

  /**
   * Date of admission.
   */
  admissionAt: string;
  completeness: EducationCompleteness;
  educationFormId: string;
  educationTypeId: string;

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

