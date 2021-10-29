import { UserGender } from '@data/api/user-service/models/user-gender';
import { UserInfo } from '@data/api/user-service/models/user-info';
import { IUserStatus, UserStatusModel } from '@app/models/user/user-status.model';
import { ImageInfo } from '@data/api/user-service/models/image-info';
import { RoleInfo } from '@data/api/user-service/models/role-info';
import { OfficeInfo } from '@data/api/user-service/models/office-info';
import { DepartmentInfo } from '@data/api/user-service/models/department-info';
import { PositionInfo } from '@data/api/user-service/models/position-info';

export interface IUserGender {
	genderType: UserGender;
	genderInRussian: string;
}

export class PersonalInfoManager {
	private static _genders: IUserGender[] = [
		{ genderType: UserGender.Male, genderInRussian: 'Мужской' },
		{ genderType: UserGender.Female, genderInRussian: 'Женский' },
		{ genderType: UserGender.NotSelected, genderInRussian: 'Не выбран' },
	];

	constructor(public _user: UserInfo | undefined) {}

	public static getGenderInfoByType(genderType: UserGender): IUserGender | undefined {
		return this._genders.find((gender: IUserGender) => gender.genderType === genderType);
	}

	public static getGenderList(): IUserGender[] {
		return this._genders.slice();
	}

	public get firstName(): string {
		return this._user?.firstName ?? 'employee';
	}

	public set firstName(firstName: string) {
		if (this._user) {
			this._user.firstName = firstName;
		}
	}

	public get lastName(): string {
		return this._user?.lastName ?? 'employee';
	}

	public set lastName(lastName: string) {
		if (this._user) {
			this._user.lastName = lastName;
		}
	}

	public get middleName(): string {
		return this._user?.middleName ?? '';
	}

	public set middleName(middleName: string) {
		if (this._user) {
			this._user.middleName = middleName;
		}
	}

	public get getFullName(): string {
		return [this.lastName, this.firstName, this.middleName].filter(Boolean).join(' ');
	}

	public get dateOfBirth(): Date | undefined {
		return this._user?.dateOfBirth ? new Date(this._user.dateOfBirth) : undefined;
	}

	public get id(): string | undefined {
		return this._user?.id;
	}

	public get startWorkingAt(): Date | undefined {
		return this._user?.startWorkingAt ? new Date(this._user.startWorkingAt) : undefined;
	}

	public get isAdmin(): boolean {
		return this._user?.isAdmin ?? false;
	}

	public get statusEmoji(): IUserStatus | undefined {
		return UserStatusModel.getUserStatusInfoByType(this._user?.status);
	}

	public get avatarImage(): ImageInfo | null | undefined {
		return this._user?.avatar;
	}

	public get gender(): IUserGender | undefined {
		return PersonalInfoManager.getGenderInfoByType(this._user?.gender ?? UserGender.NotSelected);
	}

	public get role(): RoleInfo | null | undefined {
		return this._user?.role;
	}

	public get rate(): number | undefined {
		return this._user?.rate ?? 0;
	}

	public get office(): OfficeInfo | null | undefined {
		return this._user?.office;
	}

	public get about(): string | null | undefined {
		return this._user?.about;
	}

	public get city(): string | null | undefined {
		return this._user?.city;
	}

	public get position(): PositionInfo | null | undefined {
		return this._user?.position;
	}

	public get department(): DepartmentInfo | null | undefined {
		return this._user?.department;
	}

	public get isActive(): boolean {
		return this._user?.isActive ?? false;
	}
}
