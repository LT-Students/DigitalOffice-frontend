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
  body?: { 'user'?: UserInfo, 'skills'?: Array<string>, 'communications'?: Array<CommunicationInfo>, 'certificates'?: Array<CertificateInfo>, 'achievements'?: Array<UserAchievementInfo>, 'projects'?: Array<ProjectInfo>, 'educations'?: Array<EducationInfo> };
  errors?: Array<string>;
  status?: OperationResultStatusType;
}

