import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Time } from '@angular/common';

import { IDatePeriod } from '../../../../interfaces/date-period.interface';
import { ITask } from '../../../../interfaces/task.interface';
import { IProject } from '../../../../interfaces/project.interface';

@Injectable({
  providedIn: 'root',
})
export class AttendanceService {
  private tempStartDate: Date;
  private projects: IProject[] = [
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

  public datePeriod$ = new BehaviorSubject<IDatePeriod>(
    this.getDefaultDatePeriod(6)
  );
  public recommendedTime$ = new BehaviorSubject<Time>(
    this.countRecommendedTime(this.datePeriod$.getValue())
  );
  public projects$ = new BehaviorSubject<IProject[]>(this.projects);

  constructor() {}

  private getDefaultDatePeriod(daysFromToday: number): IDatePeriod {
    const today = new Date();
    const inWeek = this.addDays(today, daysFromToday);
    return { startDate: today, endDate: inWeek };
  }

  private normalizeDatePeriod(datePeriod: IDatePeriod): IDatePeriod {
    if (datePeriod.startDate && datePeriod.endDate) {
      return datePeriod;
    } else if (datePeriod.startDate) {
      this.tempStartDate = datePeriod.startDate;
      return { startDate: datePeriod.startDate, endDate: null };
    } else {
      return { startDate: this.tempStartDate, endDate: datePeriod.endDate };
    }
  }

  public onDatePeriodChange(datePeriod: IDatePeriod): void {
    const normalizedDatePeriod = this.normalizeDatePeriod(datePeriod);
    this.datePeriod$.next(normalizedDatePeriod);
    if (normalizedDatePeriod.endDate) {
      this.recommendedTime$.next(
        this.countRecommendedTime(normalizedDatePeriod)
      );
    }
  }

  public addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(date.getDate() + days);
    return result;
  }

  public isSameDay(fromDate: Date, toDate: Date): boolean {
    return fromDate.getTime() === toDate.getTime();
  }

  public isSameMonth(fromDate: Date, toDate: Date): boolean {
    return fromDate.getMonth() === toDate.getMonth();
  }

  public normalizeTime(time: any): String {
    const timeString = time.toString();
    return timeString.length === 1 ? '0' + timeString : timeString;
  }

  public addTaskToProject(task: ITask, id: number): void {
    this.projects.forEach((project: IProject) => {
      if (project.id === id + 1) {
        project.tasks.push(task);
        this.projects$.next(this.projects.slice());
      }
    });
  }

  public getProjects(): IProject[] {
    return this.projects.slice();
  }

  public countRecommendedTime(
    datePeriod: IDatePeriod,
    hoursPerDay: number = 8,
    rate: number = 1
  ): Time {
    const daysArray: Date[] = [];

    if (
      datePeriod.endDate &&
      this.isSameDay(datePeriod.startDate, datePeriod.endDate)
    ) {
      return { hours: hoursPerDay * rate, minutes: 0 };
    } else {
      const startDate = new Date(datePeriod.startDate);
      const endDate = new Date(datePeriod.endDate);

      while (startDate.getDate() !== endDate.getDate()) {
        daysArray.push(new Date(startDate));
        startDate.setDate(startDate.getDate() + 1);
      }
      const hours =
        (daysArray.filter(
          (day: Date) => day.getDay() !== 6 && day.getDay() !== 0
        ).length +
          1) *
        hoursPerDay *
        rate;

      return { hours: hours, minutes: 0 };
    }
  }
}
