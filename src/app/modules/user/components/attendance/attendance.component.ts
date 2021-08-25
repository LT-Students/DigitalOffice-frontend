import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { UserService } from '@app/services/user/user.service';
import { AttendanceService } from '@app/services/attendance.service';
import { switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
	selector: 'do-attendance',
	templateUrl: './attendance.component.html',
	styleUrls: ['./attendance.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AttendanceComponent implements OnInit, OnDestroy {
	private attendanceSubscription: Subscription;

	constructor(private _attendanceService: AttendanceService, private _userService: UserService) {
		this.attendanceSubscription = this._userService.currentUser$
			.pipe(switchMap((user) => this._attendanceService.getActivities(user?.id)))
			.subscribe();
	}

	ngOnInit() {}

	public ngOnDestroy() {
		this.attendanceSubscription.unsubscribe();
	}
}
