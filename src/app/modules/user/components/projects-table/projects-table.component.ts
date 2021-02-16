import { Component, Input, OnInit } from '@angular/core';

import { Project } from '../../../../models/project.model';

@Component({
  selector: 'do-projects-table',
  templateUrl: './projects-table.component.html',
  styleUrls: ['./projects-table.component.scss'],
})
export class ProjectsTableComponent implements OnInit {
  constructor() {}

  @Input() activeProjects: Project[] = [];
  @Input() suspendedProjects: Project[] = [];
  @Input() closedProjects: Project[] = [];

  public groups = [
    { groupName: 'В работе', groupData: this.activeProjects },
    { groupName: 'Приостановлены', groupData: this.suspendedProjects },
    { groupName: 'Завершены', groupData: this.closedProjects },
  ];

  ngOnInit() {
    const proj1 = {
      name: 'MainProject1',
      consumer: {
        name: 'Company№1',
        description: 'Super company that is doing nothing.',
      },
      description: 'Just project-card. Nothing special.',
      contributors: [
        {
          user: {
            firstName: 'Вася',
            lastName: 'Пчелкин',
            photo: '../../../assets/images/girl.png',
          },
          totalTime: {
            hours: 40,
            minutes: 0,
          },
        },
      ],
    };
    const proj2 = {
      name: 'MainProject2',
      consumer: {
        name: 'Company№2',
        description: 'Super company that is doing nothing.',
      },
      description: 'Just project-card. Nothing special.',
      contributors: [
        {
          user: {
            firstName: 'Вася',
            lastName: 'Пчелкин',
            photo: '../../../assets/images/girl.png',
          },
          totalTime: {
            hours: 40,
            minutes: 0,
          },
        },
      ],
    };

    this.activeProjects.push(proj1, proj2);
    this.suspendedProjects.push(proj1, proj2);
    this.closedProjects.push(proj1, proj2);
  }
}
