/* tslint:disable */
/* eslint-disable */
import { CertificateInfo } from './certificate-info';
import { CommunicationInfo } from './communication-info';
import { EducationInfo } from './education-info';
import { OperationResultStatusType } from './operation-result-status-type';
import { ProjectInfo } from './project-info';
import { UserAchievementInfo } from './user-achievement-info';
import { UserInfo } from './user-info';

/**
 * Response object for action operations.
 */
export interface OperationResultResponseUserResponse {
  body?: { 'User'?: UserInfo, 'Skills'?: Array<string>, 'Communications'?: Array<CommunicationInfo>, 'Certificates'?: Array<CertificateInfo>, 'Achievements'?: Array<UserAchievementInfo>, 'Projects'?: Array<ProjectInfo>, 'Educations'?: Array<EducationInfo> };
  errors?: Array<string>;
  status?: OperationResultStatusType;
}

