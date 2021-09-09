import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { TimeDurationService } from '@app/services/time-duration.service';
import { IEditWorkTimeRequest, IFindStatRequest, IGetImport, TimeService } from '@app/services/time/time.service';
import { FindResultResponseStatInfo, LeaveTimeInfo, OperationResultResponse, OperationResultStatusType, StatInfo, UserInfo, WorkTimeInfo, WorkTimeMonthLimitInfo } from '@data/api/time-service/models';
import { DatePeriod } from '@data/models/date-period';
import { UserService } from '@app/services/user/user.service'
import { LeaveTimeModel } from '@app/models/leave-time.model';
import { User } from '@app/models/user/user.model';
import { DoValidators } from '@app/validators/do-validators';

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

  public statInfo$: Observable<MappedStatInfo[] | undefined>;

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
    this.statInfo$ = new Observable();
    this.selectedPeriod = this._setDatePeriod(new Date());
    this.hoursGroup = this._formBuilder.group({});
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

  public toggleEditMode(editMode: boolean, workTime: EditableWorkTime): void {
    workTime.editMode = editMode;
    if (editMode) {
      const year: number = this.selectedPeriod.startDate?.getFullYear()!
      const month: number = this.selectedPeriod.startDate?.getMonth()!

      const validators = [
        Validators.min(0),
        Validators.max(this._timeDurationService.countMaxMonthDuration(year, month)),
        DoValidators.number
      ]

      this.hoursGroup.addControl(`hours_${workTime.id}`, this._formBuilder.control(workTime.managerHours ?? 0, validators));
    }
    else
      this.hoursGroup.removeControl(`hours_${workTime.id}`);
  }

  public onSubmit(workTime: EditableWorkTime, statInfo: MappedStatInfo): void {
    if (this.hoursGroup.invalid) return;

    const params: IEditWorkTimeRequest = {
      workTimeId: workTime.id ?? '',
      body: [
        {
          op: 'replace',
          path: '/ManagerHours',
          value: Number(this.hoursGroup.get(`hours_${workTime.id}`)?.value ?? 0)
        }
      ]
    }

    this._timeService.editWorkTime(params).subscribe((result: OperationResultResponse) => {
      if (result.status === OperationResultStatusType.FullSuccess) {
        workTime.managerHours = Number(this.hoursGroup.get(`hours_${workTime?.id}`)?.value ?? 0);
        statInfo.totalHours = this._getTotalHours(statInfo.workTimes ?? [])
        this.toggleEditMode(false, workTime)

        this._cdr.markForCheck();
      }
    })
  }

  public onDownload() {
    const queryParams: IGetImport = {
      departmentId: this._currentUser?.department?.id,
      month: Number(this.selectedPeriod.startDate?.getMonth()) + 1,
      year: Number(this.selectedPeriod.startDate?.getFullYear())
    }

    this._timeService.getImport(queryParams).subscribe((result) => {
      const mediaType = "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,";
      const downloadLink = document.createElement('a');
      downloadLink.href = mediaType + result.body;
      downloadLink.download = 'Статистика';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      downloadLink.remove();
    })
  }

  public chosenMonthHandler(date: Date): void {
    this.selectedPeriod = this._setDatePeriod(date);
    this._getStat()
  }

  public onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this._getStat();
  }

  private _getStat(): void {
    let params: IFindStatRequest = this._getQueryParams();
    this.statInfo$ = this._timeService.findStat(params).pipe(
      map((result: FindResultResponseStatInfo) => {
        this.totalCount = result.totalCount ?? 0;
        return result.body?.map((statInfo: StatInfo) => this._mapStatInfo(statInfo)) as MappedStatInfo[]
      })
    )
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
