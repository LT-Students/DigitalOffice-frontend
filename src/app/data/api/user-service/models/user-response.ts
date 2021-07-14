/* tslint:disable */
/* eslint-disable */
import { CertificateInfo } from './certificate-info';
import { CommunicationInfo } from './communication-info';
import { EducationInfo } from './education-info';
import { ProjectInfo } from './project-info';
import { UserAchievementInfo } from './user-achievement-info';
import { UserInfo } from './user-info';
export interface UserResponse {
  achievements?: Array<UserAchievementInfo>;
  certificates?: Array<CertificateInfo>;
  communications?: Array<CommunicationInfo>;
  educations?: Array<EducationInfo>;
  errors?: Array<string>;
  projects?: Array<ProjectInfo>;
  skills?: Array<string>;
  user?: UserInfo;
}

