/* tslint:disable */
/* eslint-disable */
import { CertificateInfo } from './certificate-info';
import { CommunicationInfo } from './communication-info';
import { EducationInfo } from './education-info';
import { ImageInfo } from './image-info';
import { OperationResultStatusType } from './operation-result-status-type';
import { ProjectInfo } from './project-info';
import { UserAdditionInfo } from './user-addition-info';
import { UserInfo } from './user-info';

/**
 * Response object for action operations.
 */
export interface OperationResultResponseUserResponse {
	body?: {
		user?: UserInfo;
		UserAddition?: UserAdditionInfo;
		images?: Array<ImageInfo>;
		certificates?: Array<CertificateInfo>;
		communications?: Array<CommunicationInfo>;
		educations?: Array<EducationInfo>;
		projects?: Array<ProjectInfo>;
		skills?: Array<string>;
	};
	errors?: Array<string>;
	status?: OperationResultStatusType;
}
