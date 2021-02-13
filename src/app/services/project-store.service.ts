import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IProject } from '../interfaces/project.interface';
import { ITask } from '../interfaces/task.interface';

@Injectable({
  providedIn: 'root',
})
export class ProjectStoreService {
  private projectsData: IProject[] = [
    {
      id: 1,
      name: 'Ромашка',
      tasks: [
        {
          time: { hours: 1, minutes: 0 },
          name: 'Developing',
          description: 'desc1',
          createdAt: new Date(),
        },
        {
          time: { hours: 1, minutes: 0 },
          name:
            'Очень длинная задача, которую мне отдал мой коллега, а я не очень хотел ее делать и она занимает две строки',
          description: 'desc2',
          createdAt: new Date(),
        },
      ],
    },
    {
      id: 2,
      name: 'Рога и копыта',
      tasks: [
        {
          time: { hours: 2, minutes: 3 },
          name: 'Developing',
          description: 'desc1',
          createdAt: new Date(),
        },
      ],
    },
    {
      id: 3,
      name: 'Ещё один проект',
      tasks: [
        {
          time: { hours: 2, minutes: 3 },
          name: 'Документация',
          description: 'desc1',
          createdAt: new Date(),
        },
      ],
    },
  ];

  private readonly _projects = new BehaviorSubject<IProject[]>(
    this.projectsData
  );
  readonly projects$ = this._projects.asObservable();

  get projects(): IProject[] {
    return this._projects.getValue();
  }

  addTaskToProject(task: ITask, id: number): void {
    this.projects.forEach((project: IProject) => {
      if (project.id === id + 1) {
        project.tasks.push(task);
        this._projects.next(this.projects.slice());
      }
    });
  }
}
