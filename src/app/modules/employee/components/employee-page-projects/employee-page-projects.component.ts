import { Component, OnInit } from '@angular/core';
import { Project } from '@data/models/project';

interface UserProject extends Project {
  role: string;
  startedAt: Date;
  endedAt?: Date;
}

interface Group {
  name: string;
  projects: UserProject[];
  expanded: boolean;
  plural: {};
}

@Component({
  selector: 'do-employee-page-projects',
  templateUrl: './employee-page-projects.component.html',
  styleUrls: ['./employee-page-projects.component.scss'],
})
export class EmployeePageProjectsComponent implements OnInit {
  public userProjects: UserProject[];
  public activeProjects: UserProject[] = [];
  public participatedProjects: UserProject[] = [];

  public pluralForm;
  public groups: Group[];

  constructor() {
    this.userProjects = this._getUserProjects();

    this.userProjects.forEach((project) => {
      if (project.isActive) {
        this.activeProjects.push(project);
      } else {
        this.participatedProjects.push(project);
      }
    });

    this.pluralForm = {
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

    this.groups = [
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
  }

  ngOnInit(): void {}

  private _getUserProjects(): UserProject[] {
    const activeProject = {
      id: 'random id',
      name: 'Алиса в стране Чудес',
      shortName: 'something',
      description:
        'Разработка и внедрение  системы дополненной реальности под PS VR',
      departmentId: 'random id',
      isActive: true,
      consumer: { name: 'Iponkin Brothers', description: 'lalalal' },
      role: 'Product Manager (Middle)',
      startedAt: new Date(2020, 0, 20),
    };

    const closedProject = {
      ...activeProject,
      isActive: false,
      endedAt: new Date(2021, 5, 5),
    };

    return [
      activeProject,
      activeProject,
      closedProject,
      closedProject,
      closedProject,
      closedProject,
      closedProject,
    ];
  }

  public expandProjects(group): void {
    group.expanded = !group.expanded;
  }
}