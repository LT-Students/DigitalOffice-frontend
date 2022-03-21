/* tslint:disable */
/* eslint-disable */
import { CertificateInfo } from './certificate-info';
import { CompanyInfo } from './company-info';
import { DepartmentInfo } from './department-info';
import { EducationInfo } from './education-info';
import { ImageInfo } from './image-info';
import { OfficeInfo } from './office-info';
import { OperationResultStatusType } from './operation-result-status-type';
import { PositionInfo } from './position-info';
import { ProjectInfo } from './project-info';
import { RoleInfo } from './role-info';
import { UserAdditionInfo } from './user-addition-info';
import { UserInfo } from './user-info';

/**
 * Response object for action operations.
 */
export interface OperationResultResponseUserResponse {
	body?: {
		user?: UserInfo;
		userAddition?: UserAdditionInfo;
		company?: CompanyInfo;
		department?: DepartmentInfo;
		office?: OfficeInfo;
		position?: PositionInfo;
		role?: RoleInfo;
		images?: Array<ImageInfo>;
		certificates?: Array<CertificateInfo>;
		educations?: Array<EducationInfo>;
		projects?: Array<ProjectInfo>;
		skills?: Array<string>;
	};
	errors?: Array<string>;
	status?: OperationResultStatusType;
}
