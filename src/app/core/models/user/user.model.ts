import { UserInfo } from '@api/user-service/models/user-info';
import { UserAdditionInfo } from '@api/user-service/models/user-addition-info';
import { ImageInfo } from '@api/user-service/models/image-info';
import { UserStatus } from '@api/user-service/models/user-status';
import { CommunicationInfo } from '@api/user-service/models/communication-info';
import { CompanyInfo } from '@api/user-service/models/company-info';
import { DepartmentInfo } from '@api/user-service/models/department-info';
import { OfficeInfo } from '@api/user-service/models/office-info';
import { PositionInfo } from '@api/user-service/models/position-info';
import { RoleInfo } from '@api/user-service/models/role-info';
import { EducationInfo } from '@api/user-service/models/education-info';
import { ProjectInfo } from '@api/user-service/models/project-info';
import { UserResponse } from '@api/user-service/models/user-response';

export class User implements UserInfo, UserAdditionInfo, Omit<UserResponse, 'user' | 'userAddition'> {
	avatar?: ImageInfo;
	firstName: string;
	id: string;
	isActive: boolean;
	isAdmin: boolean;
	lastName: string;
	middleName?: string;
	status: UserStatus;
	communications?: Array<CommunicationInfo>;
	about?: string;
	businessHoursFromUtc?: string;
	businessHoursToUtc?: string;
	dateOfBirth?: string;
	genderName?: string;
	latitude?: number;
	longitude?: number;
	department?: DepartmentInfo;
	office?: OfficeInfo;
	position?: PositionInfo;
	role?: RoleInfo;
	images?: Array<ImageInfo>;
	educations?: Array<EducationInfo>;
	projects?: Array<ProjectInfo>;
	skills?: Array<string>;

	constructor(data: UserResponse) {
		this.avatar = data.user?.avatar;
		this.firstName = data.user?.firstName;
		this.id = data.user?.id;
		this.isActive = data.user?.isActive;
		this.isAdmin = data.user?.isAdmin;
		this.lastName = data.user?.lastName;
		this.middleName = data.user?.middleName;
		this.status = data.user?.status;
		this.communications = data.user?.communications;
		this.about = data.userAddition?.about;
		this.businessHoursFromUtc = data.userAddition?.businessHoursFromUtc;
		this.businessHoursToUtc = data.userAddition?.businessHoursToUtc;
		this.dateOfBirth = data.userAddition?.dateOfBirth;
		this.genderName = data.userAddition?.genderName;
		this.latitude = data.userAddition?.latitude;
		this.longitude = data.userAddition?.longitude;
		this.department = data.department;
		this.office = data.office;
		this.position = data.position;
		this.role = data.role;
		this.images = data.images;
		this.educations = data.educations;
		this.projects = data.projects;
		this.skills = data.skills;
	}
}
