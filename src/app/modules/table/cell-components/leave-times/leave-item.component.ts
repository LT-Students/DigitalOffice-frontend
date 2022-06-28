import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { LeaveTimeInfo } from '@api/time-service/models/leave-time-info';
import { Icons } from '@shared/features/icons/icons';
import { LeaveType } from '@api/time-service/models/leave-type';
import { DateTime } from 'luxon';
import { ILeaveType, LeaveTimeType } from './leave-time-type';

@Component({
	selector: 'do-leave-item',
	templateUrl: './leave-item.component.html',
	styleUrls: ['./leave-item.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeaveItemComponent implements OnInit {
	public readonly Icons = Icons;

	@Input()
	set type(type: LeaveType) {
		this.leaveType = LeaveTimeType.getLeaveInfoByLeaveType(type);
	}
	public leaveType!: ILeaveType;

	@Input()
	set leaveTimes(leaves: LeaveTimeInfo[]) {
		this.leavesDuration = this.countLeaveTimeDuration(leaves);
		this.leavesDetails = this.getLeaveTimeDetails(leaves);
	}
	public leavesDuration = 0;
	public leavesDetails = '';

	constructor() {}

	ngOnInit(): void {}

	private countLeaveTimeDuration(leaves: LeaveTimeInfo[]): number {
		return leaves.reduce((acc: number, l: LeaveTimeInfo) => {
			const startDate = DateTime.fromISO(l.startTime);
			const endDate = DateTime.fromISO(l.endTime).plus({ day: 1 });
			const days = endDate.diff(startDate).as('days');
			return acc + Math.floor(days);
		}, 0);
	}

	private getLeaveTimeDetails(leaves: LeaveTimeInfo[]): string {
		return leaves.reduce((acc: string, l: LeaveTimeInfo) => {
			const startDate = DateTime.fromISO(l.startTime).toFormat('d/MM/yy');
			const endDate = DateTime.fromISO(l.endTime).toFormat('d/MM/yy');
			const period = `${startDate} - ${endDate}`;
			return acc + period + '\n';
		}, '');
	}
}
