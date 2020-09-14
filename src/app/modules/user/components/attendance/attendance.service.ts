import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Time } from '@angular/common';

import { ITimePeriod } from '../../../../interfaces/time-period.interface';
import { ITask } from '../../../../interfaces/task.interface';
import { IProject } from '../../../../interfaces/project.interface';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  projects: IProject[] = [
    {
      id: 1,
      name: 'Ромашка',
      tasks: [
        {
          time: { hours: 1, minutes: 0 },
          name: 'Developing',
          description: 'desc1',
          createdAt: new Date()
        },
        {
          time: { hours: 1, minutes: 0 },
          name: 'Очень длинная задача, которую мне отдал мой коллега, а я не очень хотел ее делать и она занимает две строки',
          description: 'desc2',
          createdAt: new Date()
        },
      ]
    },
    {
      id: 2,
      name: 'Рога и копыта',
      tasks: [
        {
          time: { hours: 2, minutes: 3 },
          name: 'Developing',
          description: 'desc1',
          createdAt: new Date()
        }
      ]
    },
    {
      id: 3,
      name: 'Ещё один проект',
      tasks: [
        {
          time: { hours: 2, minutes: 3 },
          name: 'Документация',
          description: 'desc1',
          createdAt: new Date()
        }
      ]
    }
  ];
  public plannedHours$ = new Subject<ITimePeriod>();


  public projects$ = new BehaviorSubject<IProject[]>(this.projects);

  private ONE_DAY = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds

  constructor() {
  }

  setPlannedHoursByTimePeriod(period: ITimePeriod) {
    this.plannedHours$.next(period);
  }

  countAllHoursInMinutes(): Time {

    return;
  }

  countPlannedHours(period: ITimePeriod): Time {
    let daysArray: Date[] = [];

    if ( !period.to ) {
      return { hours: 8, minutes: 0 };
    } else {
      let from = new Date(period.from);
      let to = new Date(period.to);

      while ( from.getDate() !== to.getDate() ) {
        daysArray.push(new Date(from));
        from.setDate(from.getDate() + 1);
      }
      const hours = (daysArray.filter((day: Date) => day.getDay() !== 6 && day.getDay() !== 0).length + 1) * 8;

      return { hours: hours, minutes: 0 };
    }
  }

  addTaskToProject(task: ITask, id: number) {
    this.projects.forEach((project: IProject) => {
      if ( project.id === id ) {
        project.tasks.push(task);
        this.projects$.next(this.projects.slice());
      }
    });
  }

  getProjects(): IProject[] {
    return this.projects.slice();
  }

  getProjectIdByName(name: string): number {
    return this.projects.filter((project: IProject) => project.name === name)[0].id;
  }

  private countDaysBetween(period: ITimePeriod) {
  }
}
