import { Component, OnInit } from '@angular/core';

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
  public workFlowMode: typeof WorkFlowMode;
  public mode: WorkFlowMode;
  public skills: string[];

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
  }

  ngOnInit(): void {}
}
