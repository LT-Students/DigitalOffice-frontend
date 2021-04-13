import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'do-employee-page-projects',
  templateUrl: './employee-page-projects.component.html',
  styleUrls: ['./employee-page-projects.component.scss'],
})
export class EmployeePageProjectsComponent implements OnInit {
  public project = {
    id: '0',
    name: 'Алиса в стране Чудес',
    company: 'Iponkin Brothers',
    description:
      'Разработка и внедрение  системы дополненной реальности под PS VR',
    role: 'Product Manager (Middle)',
    startedAt: new Date(2020, 0, 20),
    endedAt: '',
  };

  public activeProjects = [];
  public participatedProjects = [];

  public status = true;

  public pluralForm = {
    roditelny: {
      one: '# проект',
      few: '# проекта',
      other: '# проектов',
    },
    predlozhny: {
      one: '# проекте',
      other: '# проектах',
    },
  };

  public groups = [
    {
      name: 'В работе',
      projects: this.activeProjects,
      expanded: false,
      plural: this.pluralForm.roditelny,
    },
    {
      name: 'Участвовал в',
      projects: this.participatedProjects,
      expanded: false,
      plural: this.pluralForm.predlozhny,
    },
  ];

  constructor() {
    this.activeProjects.push(this.project, this.project);
    this.participatedProjects.push(
      this.project,
      this.project,
      this.project,
      this.project,
      this.project,
      this.project
    );
  }

  ngOnInit(): void {}

  expandProjects(group) {
    group.expanded = !group.expanded;
  }
}
