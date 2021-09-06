import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { LeaveTimeModel } from '@app/models/leave-time.model';
import { AttendanceService } from '@app/services/attendance.service';
import { TimeDurationService } from '@app/services/time-duration.service';
import { LeaveType, WorkTimeInfo } from '@data/api/time-service/models';
import { DatePeriod } from '@data/models/date-period';


interface IProject {
  editMode: boolean;
  data: WorkTimeInfo;
}

@Component({
  selector: 'do-directors-timelist',
  templateUrl: './directors-timelist.component.html',
  styleUrls: ['./directors-timelist.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DirectorsTimelistComponent implements OnChanges {
  public hoursGroup: FormGroup;

  public projects: IProject[] = [
    {
      editMode: false,
      data: {
        id: '1',
        project: {
          name: 'Цифровой офис'
        },
        userHours: 120,
        managerHours: 130
      }
    },
    {
      editMode: false,
      data: {
        id: '2',
        project: {
          name: 'Генезис - ГеоХимия'
        },
        userHours: 37,
        managerHours: 0,
        description: 'В этом месяце я провела мильон совещаний и консультаций, сил моих больше нет, хочу надбавку и в отпуск! Пойду поем шоколад с печеньками.'
      }
    }
  ];

  public leaves = [
    {
      id: '13',
      leaveInfo: LeaveTimeModel.getLeaveInfoByLeaveType(LeaveType.Vacation),
      startTime: new Date('2021-06-12T12:00'),
      endTime: new Date('2021-06-18T12:00'),
      periodInHours: this._getPeriodInHours('2021-06-12T12:00', '2021-06-18T12:00'),
      comment: 'Все дела кинула на Олю, меня не беспокоить.'
    },
    {
      id: '14',
      leaveInfo: LeaveTimeModel.getLeaveInfoByLeaveType(LeaveType.SickLeave),
      startTime: new Date('2021-06-21T12:00'),
      endTime: new Date('2021-06-26T12:00'),
      periodInHours: this._getPeriodInHours('2021-06-21T12:00', '2021-06-26T12:00'),
      comment: 'Подхватила какую-то болячку на море...'
    }
  ]

  constructor(
    private _cdr: ChangeDetectorRef,
    private _formBuilder: FormBuilder,
    private _timeDurationService: TimeDurationService
  ) {
    this.hoursGroup = this._formBuilder.group({})
  }

  ngOnChanges() {
    console.log('changes happened')
  }

  private _getPeriodInHours(startTime: string, endTime: string): number {
    const datePeriod: DatePeriod = { startDate: new Date(startTime), endDate: new Date(endTime) }
    return this._timeDurationService.getDuration(datePeriod, 8, true);
  }

  public toggleEditMode(editMode: boolean, id: string | undefined): void {
    let project = this.projects.find(project => project.data.id === id);
    if (!project) return
    else {
      project.editMode = editMode;

      if (editMode)
        this.hoursGroup.addControl(`hours_${project.data.id}`, this._formBuilder.control(project.data.managerHours));
      else
        this.hoursGroup.removeControl(`hours_${project.data.id}`);
    }
    this._cdr.detectChanges();
  }

  public onSubmit(project: IProject): void {
    // Отправка данных на сервер
    //...
    project.data.managerHours = this.hoursGroup.get(`hours_${project.data.id}`)?.value ?? 0;
    this.toggleEditMode(false, project.data.id)
  }
}
