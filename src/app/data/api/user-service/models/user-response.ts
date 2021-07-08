/* tslint:disable */
/* eslint-disable */
import { CertificateInfo } from './certificate-info';
import { CommunicationInfo } from './communication-info';
import { DepartmentInfo } from './department-info';
import { EducationInfo } from './education-info';
import { ImageInfo } from './image-info';
import { PositionInfo } from './position-info';
import { ProjectInfo } from './project-info';
import { UserAchievementInfo } from './user-achievement-info';
import { UserInfo } from './user-info';
export interface UserResponse {
  achievements?: Array<UserAchievementInfo>;
  avatar?: ImageInfo;
  certificates?: Array<CertificateInfo>;
  communications?: Array<CommunicationInfo>;
  department?: DepartmentInfo;
  educations?: Array<EducationInfo>;
  errors?: Array<string>;
  position?: PositionInfo;
  projects?: Array<ProjectInfo>;
  skills?: Array<string>;
  user?: UserInfo;
}

