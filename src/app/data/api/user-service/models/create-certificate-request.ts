/* tslint:disable */
/* eslint-disable */
import { AddImageRequest } from './add-image-request';
import { EducationType } from './education-type';
export interface CreateCertificateRequest {
  educationType: EducationType;
  image: AddImageRequest;

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
   * Гnique user identifier.
   */
  userId: string;
}

