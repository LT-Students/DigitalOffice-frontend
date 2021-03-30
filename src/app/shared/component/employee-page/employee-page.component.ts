import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'do-employee-page',
  templateUrl: './employee-page.component.html',
  styleUrls: ['./employee-page.component.scss'],
})
export class EmployeePageComponent implements OnInit {
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
