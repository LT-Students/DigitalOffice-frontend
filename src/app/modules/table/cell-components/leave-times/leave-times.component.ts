import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { LeaveTimeInfo } from '@api/time-service/models/leave-time-info';
import { Icons } from '@shared/features/icons/icons';
import { LeaveType } from '@api/time-service/models/leave-type';
import { TableCell } from '../../models';

type LeaveTimeGroup = Partial<Record<keyof typeof LeaveType, LeaveTimeInfo[]>>;

@Component({
	selector: 'do-leave-times',
	template: `
		<do-leave-item
			*ngFor="let leaves of leaveTimeGroups | keyvalue"
			[type]="$any(leaves.key)"
			[leaveTimes]="$any(leaves.value)"
		></do-leave-item>
	`,
	styles: [],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeaveTimesComponent implements OnInit, TableCell<LeaveTimeInfo[]> {
	public readonly Icons = Icons;
	public set value(leaveTimes: LeaveTimeInfo[]) {
		this.leaveTimeGroups = this.groupLeaveTimes(leaveTimes);
	}
	public leaveTimeGroups: LeaveTimeGroup = {};

	constructor() {}

	ngOnInit(): void {}

	private groupLeaveTimes(leaveTimes: LeaveTimeInfo[]): LeaveTimeGroup {
		const group: LeaveTimeGroup = {};
		leaveTimes.forEach((lt: LeaveTimeInfo) => {
			const type = lt.leaveType;
			if (group[type]) {
				group[type]?.push(lt);
			} else {
				group[type] = [lt];
			}
		});
		return group;
	}
}
