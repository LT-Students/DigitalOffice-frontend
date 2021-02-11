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
      tasks: [],
    },
    {
      id: 2,
      name: 'Рога и копыта',
      tasks: [],
    },
    {
      id: 3,
      name: 'Ещё один проект',
      tasks: [],
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
