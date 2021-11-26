import { UserAchievementInfo } from '@data/api/user-service/models/user-achievement-info';
import { CertificateInfo } from '@data/api/user-service/models/certificate-info';
import { CommunicationInfo } from '@data/api/user-service/models/communication-info';
import { ProjectInfo } from '@data/api/user-service/models/project-info';
import { PersonalInfoManager } from '@app/models/user/personal-info-manager';
import { OperationResultResponseUserResponse } from '@data/api/user-service/models/operation-result-response-user-response';
import { EducationInfo } from '@data/api/user-service/models/education-info';
import { setProperty } from '@app/utils/utils';
import { UserInfo } from '@data/api/user-service/models/user-info';

export interface IUser {
	achievements?: UserAchievementInfo[] | null;
	certificates?: CertificateInfo[] | null;
	educations?: EducationInfo[] | null;
	communications?: CommunicationInfo[] | null;
	projects?: ProjectInfo[] | null;
	skills?: string[] | null;
}

export class User extends PersonalInfoManager implements IUser {
	achievements: UserAchievementInfo[] | null | undefined;
	certificates: CertificateInfo[] | null | undefined;
	communications: CommunicationInfo[] | null | undefined;
	projects: ProjectInfo[] | null | undefined;
	skills: string[] | null | undefined;

	constructor(data: OperationResultResponseUserResponse) {
		super(data?.body?.user as UserInfo);
		this.achievements = setProperty(data?.body?.achievements);
		this.certificates = setProperty(data?.body?.certificates);
		this.communications = setProperty(data?.body?.communications);
		this.projects = setProperty(data?.body?.projects);
		this.skills = setProperty(data?.body?.skills);
	}
}
