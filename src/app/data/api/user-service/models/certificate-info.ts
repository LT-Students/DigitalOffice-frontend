/* tslint:disable */
/* eslint-disable */
import { EducationType } from './education-type';
import { ImageInfo } from './image-info';
export interface CertificateInfo {
  educationType?: EducationType;
  id?: string;
  image?: ImageInfo;
  name?: string;
  receivedAt?: string;
  schoolName?: string;
}

