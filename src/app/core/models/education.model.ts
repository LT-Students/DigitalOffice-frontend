// eslint-disable-next-line no-shadow
export enum StudyType {
  /* заочно */
  ABSENTIA = 'заочно',
  /* очно */
  CONFRONT = 'очно',
  OFFLINE = 'offline',
  ONLINE = 'online',
}

export interface EducationPlace {
  educationInstitution: string;
  specialization: string;
  studyType: StudyType;
  startYear?: number;
  endYear: number;
}

export class EducationModel {
  private _startYear: number;
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
  private _endYear: number;
  public get endYear(): StudyType {
    return this.endYear;
  }

  constructor(data: EducationPlace) {
    this._educationInstitution = data.educationInstitution
      ? data.educationInstitution
      : null;
    this._specialization = data.specialization ? data.specialization : null;
    this._studyType = data.studyType ? data.studyType : null;
    this._startYear = data.startYear ? data.startYear : null;
    this._endYear = data.endYear ? data.endYear : null;
  }

  public getEducationalPeriod(): string {
    return this._startYear
      ? `${this._startYear}-${this._endYear}`
      : this._endYear.toString();
  }
}
