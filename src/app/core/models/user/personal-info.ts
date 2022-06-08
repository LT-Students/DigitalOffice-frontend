import { CommunicationInfo } from '@api/user-service/models/communication-info';
import { ImageInfo } from '@app/models/image.model';
import { UserInfo } from '@api/user-service/models/user-info';

export class PersonalInfo {
	public id: string;
	public firstName: string;
	public lastName: string;
	public middleName?: string;
	public isActive: boolean;
	public isAdmin: boolean;
	public avatar?: ImageInfo;
	public communications?: Array<CommunicationInfo>;
	public pendingCommunicationId?: string;

	constructor(personalInfo: UserInfo) {
		this.id = personalInfo.id;
		this.firstName = personalInfo.firstName;
		this.lastName = personalInfo.lastName;
		this.middleName = personalInfo.middleName;
		this.isActive = personalInfo.isActive;
		this.isAdmin = personalInfo.isAdmin;
		this.avatar = personalInfo.avatar;
		this.communications = personalInfo.communications;
		this.pendingCommunicationId = personalInfo.pendingInfo?.invitationCommunicationId;
	}
}
