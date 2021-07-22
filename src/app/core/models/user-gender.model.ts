import { UserGender } from '@data/api/user-service/models/user-gender';

export interface IUserGender {
	genderType: UserGender;
	genderInRussian: string;
}

export class UserGenderModel {
	private static _genders: IUserGender[] = [
		{ genderType: UserGender.Male, genderInRussian: 'Мужской' },
		{ genderType: UserGender.Female, genderInRussian: 'Женский' },
		{ genderType: UserGender.NotSelected, genderInRussian: 'Не определен' },
	];

	public static getGenderInfoByGenderType(genderType: UserGender) {
		return this._genders.find((gender: IUserGender) => gender.genderType === genderType);
	}

	public static getAllGenders(): IUserGender[] {
		return this._genders.slice();
	}
}
