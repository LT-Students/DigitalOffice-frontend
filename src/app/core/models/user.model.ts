import { UserResponse } from '@data/api/user-service/models/user-response';
import { UserAchievementInfo } from '@data/api/user-service/models/user-achievement-info';
import { ImageInfo } from '@data/api/user-service/models/image-info';
import { CertificateInfo } from '@data/api/user-service/models/certificate-info';
import { CommunicationInfo } from '@data/api/user-service/models/communication-info';
import { DepartmentInfo } from '@data/api/user-service/models/department-info';
import { PositionInfo } from '@data/api/user-service/models/position-info';
import { ProjectInfo } from '@data/api/user-service/models/project-info';
import { UserInfo } from '@data/api/user-service/models/user-info';
import { IUserStatus, UserStatusModel } from '@app/models/user-status.model';

export class User implements UserResponse {
	achievements: Array<UserAchievementInfo>;
	avatar: ImageInfo;
	certificates: Array<CertificateInfo>;
	communications: Array<CommunicationInfo>;
	department: DepartmentInfo;
	errors: Array<string>;
	position: PositionInfo;
	projects: Array<ProjectInfo>;
	skills: Array<string>;
	user: UserInfo;

	constructor(data: UserResponse) {
		this.achievements = this._setProperty(data.achievements);
		// this.avatar = this._setProperty(data.avatar);
		this.certificates = this._setProperty(data.certificates);
		this.communications = this._setProperty(data.communications);
		// this.department = this._setProperty(data.department);
		this.errors = this._setProperty(data.errors);
		// this.position = this._setProperty(data.position);
		this.projects = this._setProperty(data.projects);
		this.skills = this._setProperty(data.skills);
		this.user = this._setProperty(data.user);
	}

	public get id(): string {
		return this.user.id;
	}

	public get startWorkingDate(): Date {
		return new Date(this.user.startWorkingAt);
	}

	public get isAdmin(): boolean {
		return this.user.isAdmin;
	}

	public get firstName(): string {
		return this.user.firstName;
	}

	public set firstName(firstName: string) {
		this.user.firstName = firstName;
	}

	public get lastName(): string {
		return this.user.lastName;
	}

	public set lastName(lastName: string) {
		this.user.lastName = lastName;
	}

	public get middleName(): string {
		return this.user.middleName;
	}

	public set middleName(middleName: string) {
		this.user.middleName = middleName;
	}

	public get status(): IUserStatus {
		return UserStatusModel.getUserStatusInfoByType(this.user.status);
	}

	public getFioFull() {
		return [this.lastName, this.firstName, this.middleName].filter(Boolean).join(' ');
	}

	private _setProperty<T>(property: T) {
		return property ? property : null;
	}
}
