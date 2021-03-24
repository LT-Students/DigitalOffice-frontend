import { Component, OnInit } from '@angular/core';
import { EducationModel, StudyType } from '@app/models/education.model';

// eslint-disable-next-line no-shadow
export enum WorkFlowMode {
  EDIT = 'EDIT',
  VIEW = 'VIEW',
}

@Component({
  selector: 'do-employee-info',
  templateUrl: './employee-info.component.html',
  styleUrls: ['./employee-info.component.scss'],
})
export class EmployeeInfoComponent implements OnInit {
  public workFlowMode: typeof WorkFlowMode = WorkFlowMode;
  public mode: WorkFlowMode;
  public skills: string[];
  public education: EducationModel[];

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
    this.education = [
      new EducationModel({
        educationInstitution: 'Университет ИТМО',
        specialization: 'Информационная безопасность',
        studyType: StudyType.CONFRONT,
        startYear: 2016,
        endYear: 2020,
      }),
      new EducationModel({
        educationInstitution:
          'Национальный исследовательский университет «Высшая школа экономики»',
        specialization: 'Информационная безопасность',
        studyType: StudyType.ABSENTIA,
        startYear: 2016,
        endYear: 2020,
      }),
    ];
  }

  ngOnInit(): void {}
}
