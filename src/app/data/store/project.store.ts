import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProjectApiService } from '@data/api/project-service/services/project-api.service';
import { WorkTimeApiService } from '@data/api/time-management-service/services/work-time-api.service';
import { WorkTime } from '@data/models/work-time';
import { Project } from '@data/models/project';

@Injectable({
  providedIn: 'root',
})
export class ProjectStore {
  private projectsData: Project[] = [
    {
      id: '1',
      name: 'Ромашка',
      shortName: 'RO',
      description: '13',
      departmentId: '1',
      isActive: true,
      workTime: [
        {
          minutes: 60,
          title: 'Developing',
          description: 'desc1',
          createdAt: new Date(),
        },
        {
          minutes: 60,
          title:
            'Очень длинная задача, которую мне отдал мой коллега, а я не очень хотел ее делать и она занимает две строки',
          description: 'desc2',
          createdAt: new Date(),
        },
      ],
    },
    {
      id: '2',
      name: 'Рога и копыта',
      shortName: 'RO',
      description: '13',
      departmentId: '1',
      isActive: true,
      workTime: [
        {
          minutes: 123,
          title: 'Developing',
          description: 'desc1',
          createdAt: new Date(),
        },
      ],
    },
    {
      id: '3',
      name: 'Ещё один проект',
      shortName: 'RO',
      description: '13',
      departmentId: '1',
      isActive: true,
      workTime: [
        {
          minutes: 123,
          title: 'Документация',
          description: 'desc1',
          createdAt: new Date(),
        },
      ],
    },
  ];

  private readonly _projects = new BehaviorSubject<Project[]>(
    this.projectsData
  );

  readonly projects$ = this._projects.asObservable();

  constructor(
    private projectApiService: ProjectApiService,
    private workTimeApiService: WorkTimeApiService
  ) {
    // this.loadInitialData();
  }

  get projects(): Project[] {
    return this._projects.getValue();
  }
  // TODO убрать Partial
  addWorkTimeToProject(workTime: Partial<WorkTime>, projectId: string): void {
    // вызываем бэкенд метод, для создания WorkTime
    // проверить на работоспособность, раньше проверка была такая
    // project.id === id + 1 ???
    this.projects.forEach((project: Project) => {
      if (project.id === projectId) {
        project.workTime.push(workTime);
        this._projects.next(this.projects.slice());
      }
    });
  }

  /*  private loadInitialData(): void {
    this.projectApiService.getProjects().subscribe((projects) => {});
    forkJoin([
      this.projectService.getProjects(),
      // сюда прокинуть userId, startTime, endTime
      this.timeManagementService.getUserWorkTimes(),
    ]).subscribe((res) => {
      const [projects, tasks] = res;
      // тут заполнить проекты тасками
    });
  }*/
}
