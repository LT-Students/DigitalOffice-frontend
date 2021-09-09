import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { TimeDurationService } from '@app/services/time-duration.service';
import { IEditWorkTimeRequest, IFindStatRequest, TimeService } from '@app/services/time/time.service';
import { FindResultResponseStatInfo, LeaveTimeInfo, OperationResultResponse, OperationResultStatusType, StatInfo, UserInfo, WorkTimeInfo, WorkTimeMonthLimitInfo } from '@data/api/time-service/models';
import { DatePeriod } from '@data/models/date-period';
import { UserService } from '@app/services/user/user.service'
import { LeaveTimeModel } from '@app/models/leave-time.model';
import { User } from '@app/models/user/user.model';

interface EditableWorkTime extends WorkTimeInfo {
  editMode: boolean;
}

// Название, наверное, не самое удачное
interface IconedLeaveTimeInfo extends LeaveTimeInfo {
  emojiIcon: string;
  leaveInRussian: string;
  periodInHours: number;
}

interface MappedStatInfo {
  totalHours: number;
  leaveTimes?: IconedLeaveTimeInfo[];
  limitInfo?: WorkTimeMonthLimitInfo;
  user?: UserInfo;
  workTimes?: Array<EditableWorkTime>;
}

@Component({
  selector: 'do-directors-timelist',
  templateUrl: './directors-timelist.component.html',
  styleUrls: ['./directors-timelist.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DirectorsTimelistComponent implements OnInit {
  public hoursGroup: FormGroup;

  private _currentUser: User | null;

  private readonly _statInfo: BehaviorSubject<MappedStatInfo[]>
  public readonly statInfo$: Observable<MappedStatInfo[]>;

  public selectedPeriod: DatePeriod;

  public pageSize: number;
  public pageIndex: number;
  public totalCount: number;


  constructor(
    private _cdr: ChangeDetectorRef,
    private _formBuilder: FormBuilder,
    private _timeDurationService: TimeDurationService,
    private _timeService: TimeService,
    private _userService: UserService
  ) {
    this._currentUser = null;
    this._statInfo = new BehaviorSubject<MappedStatInfo[]>([])
    this.statInfo$ = this._statInfo.asObservable();
    this.selectedPeriod = this._setDatePeriod(new Date());
    this.hoursGroup = this._formBuilder.group({})
    this.pageSize = 20;
    this.pageIndex = 0;
    this.totalCount = 0;
  }

  ngOnInit() {
    this._userService.currentUser$.subscribe(result => {
      this._currentUser = result;
      this._getStat();
    })
  }

  public toggleEditMode(editMode: boolean, workTimeId: string | undefined): void {
    console.log(workTimeId)
    let workTime = this._searchWorkTimeById(workTimeId);
    console.log(workTime)
    if (!workTime) return
    else {
      workTime.editMode = editMode;
      console.log(workTime)
      if (editMode)
        this.hoursGroup.addControl(`hours_${workTime.id}`, this._formBuilder.control(workTime.managerHours ?? 0));
      else
        this.hoursGroup.removeControl(`hours_${workTime.id}`);
    }
  }

  public onSubmit(workTimeId: string | undefined, statInfo: MappedStatInfo): void {
    let workTime = this._searchWorkTimeById(workTimeId);
    console.log(workTime)

    if (!workTime) return;
    else {
      const params: IEditWorkTimeRequest = {
        workTimeId: workTime.id ?? '',
        body: [
          {
            op: 'replace',
            path: '/ManagerHours',
            value: this.hoursGroup.get(`hours_${workTime.id}`)?.value ?? 0
          }
        ]
      }

      this._timeService.editWorkTime(params).subscribe((result: OperationResultResponse) => {
        if (result.status === OperationResultStatusType.FullSuccess) {
          if (workTime !== null) {
            console.log(workTime)
            workTime.managerHours = this.hoursGroup.get(`hours_${workTime?.id}`)?.value ?? 0;

            statInfo.totalHours = this._getTotalHours(statInfo.workTimes!)
            console.log(statInfo.totalHours)

            this.toggleEditMode(false, workTime.id)
            this._cdr.markForCheck();
          }
        }
      })
    }
  }


  public chosenMonthHandler(date: Date): void {
    console.log(date)
    this.selectedPeriod = this._setDatePeriod(date);
    this._getStat()
  }

  public onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  private _searchWorkTimeById(workTimeId: string | undefined): EditableWorkTime | null {
    for (let statInfo of this._statInfo.value) {
      for (let workTime of statInfo.workTimes ?? []) {
        if (workTime?.id === workTimeId)
          return workTime as EditableWorkTime;
      }
    }

    return null;
  }

  private _getStat(): void {
    let params: IFindStatRequest = this._getQueryParams();
    console.log(params)
    this._timeService.findStat(params).pipe(
      map((result: FindResultResponseStatInfo) => {
        console.log('Исходные данные: ', result)
        const mappedStatInfo = result.body?.map((statInfo: StatInfo) => this._mapStatInfo(statInfo)) as MappedStatInfo[]
        this._statInfo.next(mappedStatInfo)
      })
    ).subscribe((result) => {
      // this._cdr.markForCheck();
    })
  }

  private _mapStatInfo(statInfo: StatInfo) {
    return {
      ...statInfo,
      totalHours: this._getTotalHours(statInfo.workTimes ?? []),
      leaveTimes: statInfo.leaveTimes?.map<IconedLeaveTimeInfo>(leaveTime => ({
        ...leaveTime,
        emojiIcon: LeaveTimeModel.getLeaveInfoByLeaveType(leaveTime.leaveType!)?.emojiIcon ?? '',
        leaveInRussian: LeaveTimeModel.getLeaveInfoByLeaveType(leaveTime.leaveType!)?.leaveInRussian ?? '',
        periodInHours: this._getPeriodInHours(leaveTime.startTime ?? '', leaveTime.endTime ?? '')
      })),
      workTimes: statInfo.workTimes?.map<EditableWorkTime>(workTime => ({
        ...workTime,
        editMode: false
      }))
    }
  }

  private _getTotalHours(workTimes: WorkTimeInfo[]): number {
    console.log(workTimes.map(workTime => workTime.managerHours ? workTime.managerHours : workTime.userHours ? workTime.userHours : 0));
    return workTimes
      .map(workTime => workTime.managerHours ? workTime.managerHours : workTime.userHours ? workTime.userHours : 0)
      .reduce((hours1, hours2) => Number(hours1) + Number(hours2), 0);
  }

  private _getQueryParams(): IFindStatRequest {
    return {
      month: this.selectedPeriod.startDate?.getMonth()! + 1,
      year: this.selectedPeriod.startDate?.getFullYear(),
      takeCount: this.pageSize,
      skipCount: this.pageSize * this.pageIndex,
      departmentId: this._currentUser?.department?.id
    }
  }

  private _setDatePeriod(startDate: Date): DatePeriod {
    return {
      startDate,
      endDate: new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0)
    }
  }

  private _getPeriodInHours(startTime: string, endTime: string): number {
    const datePeriod: DatePeriod = { startDate: new Date(startTime), endDate: new Date(endTime) }
    return this._timeDurationService.getDuration(datePeriod, 8, true);
  }
}
