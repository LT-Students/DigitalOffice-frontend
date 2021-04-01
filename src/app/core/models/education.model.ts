// eslint-disable-next-line no-shadow
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

export interface EducationPlace {
  educationInstitution: string;
  specialization: string;
  studyType: StudyType;
  endYear: Date;
  startYear?: Date;
  certificateId?: string;
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
  private _studyType: StudyType;
  public get studyType(): StudyType {
    return this._studyType;
  }
  public set studyType(studyType: StudyType) {
    this._studyType = studyType;
  }
  private _startYear: Date;
  public get startYear(): Date {
    return this._startYear;
  }
  public set startYear(year: Date) {
    this._startYear = year;
  }
  private _endYear: Date;
  public get endYear(): Date {
    return this._endYear;
  }
  public set endYear(year: Date) {
    this._endYear = year;
  }
  private _certificateId: string;
  public get certificateId(): string {
    return this._certificateId;
  }

  constructor(data: EducationPlace) {
    this._educationInstitution = data.educationInstitution
      ? data.educationInstitution
      : null;
    this._specialization = data.specialization ? data.specialization : null;
    this._studyType = data.studyType ? data.studyType : null;
    this._startYear = data.startYear ? data.startYear : null;
    this._endYear = data.endYear ? data.endYear : null;
    this._certificateId = data.certificateId ? data.certificateId : null;
    this.isEditing = false;
  }

  public getEducationalPeriod(): string {
    return this._startYear
      ? `${this._startYear.getFullYear()}-${this._endYear.getFullYear()}`
      : this._endYear.getFullYear().toString();
  }
}
