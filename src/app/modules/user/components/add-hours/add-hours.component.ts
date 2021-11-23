import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AttendanceService } from '@app/services/attendance.service';

@Component({
	selector: 'do-add-hours',
	templateUrl: './add-hours.component.html',
	styleUrls: ['./add-hours.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddHoursComponent {
	public isWorktimeForm: boolean;

	constructor(private _attendanceService: AttendanceService) {
		this.isWorktimeForm = true;
	}

	public toggleFormType(isWorktimeForm: boolean): void {
		this.isWorktimeForm = isWorktimeForm;
	}
}
