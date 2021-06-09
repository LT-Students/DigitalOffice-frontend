// eslint-disable-next-line no-shadow
import { CertificateInfo } from '@data/api/user-service/models/certificate-info';
import { EducationType } from '@data/api/user-service/models/education-type';
import { ImageInfo } from '@data/api/user-service/models/image-info';

export enum StudyType {
	/* заочно */
	ABSENTIA = 'заочно',
	/* очно */
	CONFRONT = 'очно',
	/* очно-заочно */
	PARTTIME = 'очно-заочно',
	OFFLINE = 'offline',
	ONLINE = 'online',
}

export interface CertificateInfoExtended extends CertificateInfo {
	isEditing?: boolean;
}

export class EducationModel {
	public isEditing: boolean;

	private _educationInstitution: string;
	public get educationInstitution(): string {
		return this._educationInstitution;
	}
	private _specialization: string;
	public get specialization(): string {
		return this._specialization;
	}
	private _studyType: EducationType;
	public get studyType(): EducationType {
		return this._studyType;
	}
	public set studyType(studyType: EducationType) {
		this._studyType = studyType;
	}
	private _startYear: Date;
	public get startYear(): Date {
		return this._startYear;
	}
	public set startYear(year: Date) {
		this._startYear = year;
	}
	private _endYear: string;
	public get endYear(): Date {
		return new Date(this._endYear);
	}
	// public set endYear(year: Date) {
	//   this._endYear = year;
	// }
	private _certificateId: string;
	public get certificateId(): string {
		return this._certificateId;
	}

	private _image: ImageInfo;
	public get imageInBase64(): string {
		return this._image.content;
	}

	// constructor(data: EducationPlace) {
	//   this._educationInstitution = data.educationInstitution
	//     ? data.educationInstitution
	//     : null;
	//   this._specialization = data.specialization ? data.specialization : null;
	//   this._studyType = data.studyType ? data.studyType : null;
	//   this._startYear = data.startYear ? data.startYear : null;
	//   this._endYear = data.endYear ? data.endYear : null;
	//   this._certificateId = data.certificateId ? data.certificateId : null;
	//   this.isEditing = false;
	// }

	constructor(data: CertificateInfo) {
		this._educationInstitution = data.schoolName ? data.schoolName : null;
		this._specialization = data.name ? data.name : null;
		this._studyType = data.educationType ? data.educationType : null;
		// this._startYear = data.startYear ? data.startYear : null;
		this._endYear = data.receivedAt ? data.receivedAt : null;
		this._certificateId = data.id ? data.id : null;
		this._image = data.image ? data.image : null;
		this.isEditing = false;
	}

	public getEducationalPeriod(): string {
		return this._startYear ? `${this._startYear.getFullYear()}-${this.endYear.getFullYear()}` : this.endYear.getFullYear().toString();
	}
}
