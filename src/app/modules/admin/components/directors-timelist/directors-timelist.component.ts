import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LeaveTimeModel } from '@app/models/leave-time.model';
import { LeaveType } from '@data/api/time-service/models';

interface IProject {
  editMode: boolean;
  data: {
    id?: string,
    name?: string,
    userHours?: number,
    managerHours?: number,
    comment?: string
  }
}

@Component({
  selector: 'do-directors-timelist',
  templateUrl: './directors-timelist.component.html',
  styleUrls: ['./directors-timelist.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DirectorsTimelistComponent {
  public hoursGroup: FormGroup;

  public projects: IProject[] = [
    {
      editMode: false,
      data: {
        id: '1',
        name: 'Цифровой офис',
        userHours: 120,
        managerHours: 130
      }
    },
    {
      editMode: false,
      data: {
        id: '2',
        name: 'Генезис - ГеоХимия',
        userHours: 37,
        managerHours: 0,
        comment: 'В этом месяце я провела мильон совещаний и консультаций, сил моих больше нет, хочу надбавку и в отпуск! Пойду поем шоколад с печеньками.'
      }
    }
  ];

  public leaves = [
    {
      id: '13',
      leaveType: LeaveType.Vacation,
      period: '12/06/2021-18/06/2021',
      comment: 'Все дела кинула на Олю, меня не беспокоить.'
    },
    {
      id: '13',
      leaveType: LeaveType.SickLeave,
      period: '21/06/2021-26/06/2021',
      comment: 'Подхватила какую-то болячку на море...'
    }
  ]

  constructor(
    private _cdr: ChangeDetectorRef,
    private _formBuilder: FormBuilder
  ) {
    this.hoursGroup = this._createGroup();
  }

  public getRusLeaveType(leave: LeaveType): string | undefined {
    return LeaveTimeModel.getLeaveInfoByLeaveType(leave)?.leaveInRussian;
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
    //this._cdr.markForCheck();
  }

  public onSubmit(project: IProject): void {
    // Отправка данных на сервер
    //...
    project.data.managerHours = this.hoursGroup.get(`hours_${project.data.id}`)?.value ?? 0;
    this.toggleEditMode(false, project.data.id)
  }

  private _createGroup(): FormGroup {
    return this._formBuilder.group({})
  }
}
