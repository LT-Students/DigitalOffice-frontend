import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'do-employee-info',
  templateUrl: './employee-info.component.html',
  styleUrls: ['./employee-info.component.scss'],
})
export class EmployeeInfoComponent implements OnInit {
  private _skills: Array<string>;

  constructor() {
    this._skills = [
      'Atlassian Jira',
      'Key Account Management',
      'CJM',
      'Agile Project Management',
    ];
  }

  ngOnInit(): void {}
}
