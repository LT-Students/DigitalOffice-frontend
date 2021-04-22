import { Component, Input, OnInit } from '@angular/core';
import { Project } from '@data/models/project';
import { Router } from '@angular/router';
import { UserProject } from '../../employee-page.component';


interface Group {
  name: string;
  projects: UserProject[];
  plural: {[p: string]: string};
}

@Component({
  selector: 'do-employee-page-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  @Input() userProjects: UserProject[];
  public activeProjects: UserProject[];
  public closedProjects: UserProject[];

  public pluralForm;
  public groups: Group[];

  constructor(private router: Router) {
    this.activeProjects = this.userProjects.filter((project: UserProject) => project.isActive);
    this.closedProjects = this.userProjects.filter((project: UserProject) => !project.isActive);

    this.pluralForm = {
      activeProjectsTitle: {
        one: '# проект',
        few: '# проекта',
        other: '# проектов',
      },
      closedProjectsTitle: {
        one: '# проекте',
        other: '# проектах',
      },
    };

    this.groups = [
      {
        name: 'В работе',
        projects: this.activeProjects,
        plural: this.pluralForm.activeProjectsTitle,
      },
      {
        name: 'Участвовал в',
        projects: this.closedProjects,
        plural: this.pluralForm.closedProjectsTitle,
      },
    ];
  }

  ngOnInit(): void {}

  public expandProjects(group): void {
    group.expanded = !group.expanded;
  }

  public onMoreClicked(projectId: string) {
    this.router.navigate(['/project', projectId]);
  }
}
