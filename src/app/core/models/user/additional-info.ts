import { UserAdditionInfo } from '@api/user-service/models/user-addition-info';

export interface LatLng {
	latitude: number;
	longitude: number;
}

export class AdditionalInfo {
	public about?: string;
	public businessHoursFromUtc?: string;
	public businessHoursToUtc?: string;
	public dateOfBirth?: string;
	public genderName?: string;
	public location?: LatLng;

	constructor(additionInfo: UserAdditionInfo) {
		this.about = additionInfo.about;
		this.businessHoursFromUtc = additionInfo.about;
		this.businessHoursToUtc = additionInfo.about;
		this.dateOfBirth = additionInfo.about;
		this.genderName = additionInfo.about;

		if (additionInfo.latitude && additionInfo.longitude) {
			this.location = {
				latitude: additionInfo.latitude,
				longitude: additionInfo.longitude,
			};
		}
	}
}
