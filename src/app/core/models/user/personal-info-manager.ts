import { UserGender } from '@data/api/user-service/models/user-gender';
import { UserInfo } from '@data/api/user-service/models/user-info';

export interface IUserGender {
	genderType: UserGender;
	genderInRussian: string;
}

export class PersonalInfoManager {
	private static _genders: IUserGender[] = [
		{ genderType: UserGender.Male, genderInRussian: 'Мужской' },
		{ genderType: UserGender.Female, genderInRussian: 'Женский' },
		{ genderType: UserGender.NotSelected, genderInRussian: 'Не определен' },
	];

	constructor(private _user: UserInfo) {
	}

	public static getGenderInfoByType(genderType: UserGender) {
		return this._genders.find((gender: IUserGender) => gender.genderType === genderType);
	}

	public static getGenderList(): IUserGender[] {
		return this._genders.slice();
	}

	public get firstName(): string {
		return this._user?.firstName;
	}

	public set firstName(firstName: string) {
		this._user.firstName = firstName;
	}

	public get lastName(): string {
		return this._user?.lastName;
	}

	public set lastName(lastName: string) {
		this._user.lastName = lastName;
	}

	public get middleName(): string {
		return this._user.middleName;
	}

	public set middleName(middleName: string) {
		this._user.middleName = middleName;
	}

	public getFioFull() {
		return [this.lastName, this.firstName, this.middleName].filter(Boolean).join(' ');
	}

	public dateOfBirth(): Date {
		return new Date(this._user.dateOfBirth);
	}
}
