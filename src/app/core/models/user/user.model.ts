//@ts-nocheck
import { UserAchievementInfo } from '@data/api/user-service/models/user-achievement-info';
import { ImageInfo } from '@data/api/user-service/models/image-info';
import { CertificateInfo } from '@data/api/user-service/models/certificate-info';
import { CommunicationInfo } from '@data/api/user-service/models/communication-info';
import { DepartmentInfo } from '@data/api/user-service/models/department-info';
import { PositionInfo } from '@data/api/user-service/models/position-info';
import { ProjectInfo } from '@data/api/user-service/models/project-info';
import { UserInfo } from '@data/api/user-service/models/user-info';
import { IUserStatus, UserStatusModel } from '@app/models/user/user-status.model';
import { IUserGender, PersonalInfoManager } from '@app/models/user/personal-info-manager';
import { OperationResultResponseUserResponse } from '@data/api/user-service/models/operation-result-response-user-response';
import { EducationInfo } from '@data/api/user-service/models/education-info';
import { setProperty } from '@app/utils/utils';

export class IUser {
	user: UserInfo;
	achievements?: UserAchievementInfo[];
	avatar?: ImageInfo;
	certificates: CertificateInfo[];
	educations?: EducationInfo[];
	communications?: CommunicationInfo[];
	department: DepartmentInfo;
	position: PositionInfo;
	projects?: ProjectInfo[];
	skills: string[];
}

export class User extends PersonalInfoManager implements IUser {
	achievements: UserAchievementInfo[];
	avatar: ImageInfo;
	certificates: CertificateInfo[];
	communications: CommunicationInfo[];
	department: DepartmentInfo;
	position: PositionInfo;
	projects: ProjectInfo[];
	skills: string[];
	user: UserInfo;

	constructor(data: OperationResultResponseUserResponse) {
		super(data?.body.user);
		this.achievements = setProperty(data?.body.achievements);
		this.certificates = setProperty(data?.body.certificates);
		this.communications = setProperty(data?.body.communications);
		this.projects = setProperty(data?.body.projects);
		this.skills = setProperty(data?.body.skills);
		this.user = setProperty(data?.body.user);
		// this.avatar = this._setProperty(data.avatar);
		// this.department = this._setProperty(data.department);
		// this.position = this._setProperty(data.position);
	}

	public get id(): string {
		return this.user.id;
	}

	public get startWorkingDate(): Date {
		return new Date(this.user.startWorkingAt);
	}

	public get isAdmin(): boolean {
		return this.user?.isAdmin;
	}

	public get statusEmoji(): IUserStatus {
		return UserStatusModel.getUserStatusInfoByType(this.user.status);
	}

	public get avatarImage(): ImageInfo {
		return this.user.avatar;
	}

	public get gender(): IUserGender {
		return PersonalInfoManager.getGenderInfoByType(this.user.gender);
	}
}
