import { OfficeInfo } from '@api/user-service/models/office-info';
import { PositionInfo } from '@api/user-service/models/position-info';
import { RoleInfo } from '@api/user-service/models/role-info';
import { UserResponse } from '@api/user-service/models/user-response';
import { PersonalInfo } from '@app/models/user/personal-info';
import { AdditionalInfo } from '@app/models/user/additional-info';
import { ImageInfo } from '@app/models/image.model';
import { DepartmentInfo } from '@app/models/user/department-user-info';
import { CompanyUserInfo } from '@api/user-service/models/company-user-info';

export class User extends PersonalInfo {
	public additionalInfo: AdditionalInfo;
	public company?: CompanyUserInfo;
	public department?: DepartmentInfo;
	public office?: OfficeInfo;
	public position?: PositionInfo;
	public role?: RoleInfo;
	public images?: Array<ImageInfo>;

	constructor(data: UserResponse) {
		super(data.user);
		this.additionalInfo = new AdditionalInfo(data.userAddition);
		this.company = data.companyUser;
		this.department = data.departmentUser && new DepartmentInfo(data.departmentUser);
		this.office = data.office;
		this.position = data.position;
		this.role = data.role;
		this.images = data.images;
	}
}
