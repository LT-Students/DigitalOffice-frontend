import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { RANGE_DATE_FORMAT } from '@app/configs/date-formats';
import { AlertService } from '@app/services/alert.service';
import { AttendanceService } from '../../../services/attendance.service';
import { AddEditLeaveHoursBase } from './add-edit-leave-hours-base';

@Component({
	selector: 'do-add-leave-hours',
	templateUrl: './add-leave-hours.component.html',
	styleUrls: ['./add-leave-hours.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [{ provide: MAT_DATE_FORMATS, useValue: RANGE_DATE_FORMAT }],
})
export class AddLeaveHoursComponent extends AddEditLeaveHoursBase {
	constructor(private alert: AlertService, fb: FormBuilder, attendanceService: AttendanceService) {
		super(fb, attendanceService);
	}

	public handleSubmit(): void {
		this.submit$().subscribe({
			next: (success: boolean) =>
				success && this.alert.open('Не забудьте сообщить отделу кадров о вашем отсутствии!'),
		});
	}
}
