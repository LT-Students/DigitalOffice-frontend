import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProjectApiService } from '@data/api/project-service/services/project-api.service';
import { Task } from '@app/models/task.model';
import { ProjectModel } from '@app/models/project/project.model';
import { WorkTimeApiService } from '@data/api/time-service/services';

@Injectable({
  providedIn: 'root',
})
export class ProjectStore {
  private projectsData: ProjectModel[] = [
    {
      id: '1',
      name: 'Ромашка',
      shortName: 'RO',
      description: '13',
      departmentId: '1',
      isActive: true,
      tasks: [
        {
          id: '1',
          projectId: '1',
          minutes: 60,
          title: 'Developing',
          description: 'Я собрала машину времени и перенеслась в прошлое на 50 лет назад. Познакомилась с Майклом Джексоном, он мило со мной болтал. Но потом меня неожиданно вернуло назад. Очень-очень жаль. Все логи я уже передала разработчикам. Надеюсь, они найдут проблему.',
          createdAt: new Date(),
        },
        {
          id: '2',
          projectId: '1',
          minutes: 60,
          title:
            'Проектирование машины времени и ещё интересных вещей',
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
      tasks: [
        {
          id: '3',
          projectId: '2',
          minutes: 123,
          title: 'Developing',
          description: 'Я собрала машину времени и перенеслась в прошлое на 50 лет назад. Познакомилась с Майклом Джексоном, он мило со мной болтал. Но потом меня неожиданно вернуло назад. Очень-очень жаль. Все логи я уже передала разработчикам. Надеюсь, они найдут проблему.',
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
      tasks: [
        {
          id: '4',
          projectId: '3',
          minutes: 123,
          title: 'Документация',
          description: 'desc1',
          createdAt: new Date(),
        },
      ],
    },
  ];

  private readonly _projects = new BehaviorSubject<any[]>(
    this.projectsData
  );

  readonly projects$ = this._projects.asObservable();

  constructor(
    private projectApiService: ProjectApiService,
    private workTimeApiService: WorkTimeApiService
  ) {
    // this.loadInitialData();
  }

  get projects(): ProjectModel[] {
    return this._projects.getValue();
  }

  // TODO убрать Partial
  addTaskToProject(task: Partial<Task>, projectId: string): void {
    const elIndex = this.projects.findIndex(
      (project) => project.id === projectId
    );
    this.projects[elIndex].tasks.push(task);
    this._projects.next([...this.projects]);
  }

  deleteTaskFromProject(projectId: string, taskId: string): boolean {
    const elIndex = this.projects.findIndex(
      (project) => project.id === projectId
    );

    this.projects[elIndex].tasks = this.projects[elIndex].tasks.filter(
      (task) => task.id !== taskId
    );

    this._projects.next([...this.projects]);
    return true;
  }

  changeDescriptionInTask(
    projectId: string,
    taskId: string,
    newDescription: string
  ): boolean {
    const elIndex = this.projects.findIndex(
      (project) => project.id === projectId
    );

    const workIndex = this.projects[elIndex].tasks.findIndex(
      (work) => work.id === taskId
    );

    this.projects[elIndex].tasks[workIndex].description = newDescription;

    this._projects.next([...this.projects]);
    return true;
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
