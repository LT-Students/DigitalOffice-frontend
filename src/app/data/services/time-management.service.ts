import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Constants } from '../../core/constants/constants';
import { WorkTime } from '../models/work-time';
import { LeaveTime } from '../models/leave-time';

@Injectable({
  providedIn: 'root',
})
export class TimeManagementService {
  private leaveTimeApiPath =
    this.constants.TIME_MANAGEMENT_SERVICE_ENDPOINT + 'leaveTime';
  private workTimeApiPath =
    this.constants.TIME_MANAGEMENT_SERVICE_ENDPOINT + 'workTime';

  constructor(private constants: Constants, private http: HttpClient) {}

  getUserWorkTimes(
    userId: string,
    startTime: Date,
    endTime: Date
  ): Observable<WorkTime[]> {
    return this.http.post<WorkTime[]>(
      `${this.workTimeApiPath}/getUserWorkTimes`,
      {
        startTime,
        endTime,
      },
      { params: new HttpParams().set('userId', userId) }
    );
  }

  addWorkTime(body: WorkTime): Observable<string> {
    return this.http.post<string>(`${this.workTimeApiPath}/addWorkTime`, body);
  }

  getUserLeaveTimes(userId: string): Observable<LeaveTime[]> {
    return this.http.post<LeaveTime[]>(
      `${this.leaveTimeApiPath}/getUserLeaveTimes`,
      {},
      { params: new HttpParams().set('userId', userId) }
    );
  }

  addLeaveTime(body: LeaveTime): Observable<string> {
    return this.http.post<string>(
      `${this.leaveTimeApiPath}/addLeaveTime`,
      body
    );
  }
}
