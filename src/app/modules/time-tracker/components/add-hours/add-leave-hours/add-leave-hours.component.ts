import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { AlertService } from '@app/services/alert.service';
import { AddLeaveTimeBaseComponent } from '../../../shared/add-leave-time-base/add-leave-time-base.component';

@Component({
	selector: 'do-add-leave-hours',
	templateUrl: './add-leave-hours.component.html',
	styleUrls: ['./add-leave-hours.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddLeaveHoursComponent {
	@ViewChild(AddLeaveTimeBaseComponent, { static: true }) baseComponent!: AddLeaveTimeBaseComponent;

	constructor(private alert: AlertService) {}

	public handleSubmit(): void {
		this.baseComponent.submit$().subscribe({
			next: () => {
				this.baseComponent.resetForm();
				this.alert.open('Не забудьте сообщить отделу кадров о вашем отсутствии!');
			},
		});
	}
}
