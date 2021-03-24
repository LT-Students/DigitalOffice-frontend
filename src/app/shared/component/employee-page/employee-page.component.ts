import { Component, OnInit } from '@angular/core';
import { EducationModel, StudyType } from '@app/models/education.model';

// eslint-disable-next-line no-shadow
export enum WorkFlowMode {
  EDIT = 'EDIT',
  VIEW = 'VIEW',
}

@Component({
  selector: 'do-employee-page',
  templateUrl: './employee-page.component.html',
  styleUrls: ['./employee-page.component.scss'],
})
export class EmployeePageComponent implements OnInit {
  public workFlowMode: typeof WorkFlowMode = WorkFlowMode;
  public mode: WorkFlowMode;
  public skills: string[];
  public institutes: EducationModel[];
  public courses: EducationModel[];

  constructor() {
    this.mode = WorkFlowMode.VIEW;
    this.skills = [
      'Atlassian Jira',
      'Key Account Management',
      'CJM',
      'Agile Project Management',
      'Agile Project Management',
      'Agile Project Management',
      'Agile Project Management',
      'Agile Project Management',
      'Agile Project Management',
    ];
    this.institutes = [
      new EducationModel({
        educationInstitution: 'Университет ИТМО',
        specialization: 'Информационная безопасность',
        studyType: StudyType.CONFRONT,
        startYear: 2014,
        endYear: 2018,
      }),
      new EducationModel({
        educationInstitution:
          'Национальный исследовательский университет «Высшая школа экономики»',
        specialization: 'Информационная безопасность',
        studyType: StudyType.ABSENTIA,
        startYear: 2018,
        endYear: 2020,
      }),
    ];
    this.courses = [
      new EducationModel({
        educationInstitution: 'Бруноям',
        specialization: 'UX/UI дизайнер',
        studyType: StudyType.OFFLINE,
        endYear: 2020,
        certificateId: 'f92f878c-8cad-11eb-8dcd-0242ac130003',
      }),
      new EducationModel({
        educationInstitution: 'HTML-academy',
        specialization: 'Веб-программирование',
        studyType: StudyType.ONLINE,
        endYear: 2020,
        certificateId: 'f92f878c-8cad-11eb-8dcd-0242ac130003',
      }),
    ];
  }

  ngOnInit(): void {}
}
