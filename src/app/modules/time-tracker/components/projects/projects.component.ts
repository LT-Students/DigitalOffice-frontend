import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DialogService, ModalWidth } from '@app/services/dialog.service';
import { Icons } from '@shared/modules/icons/icons';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { EditProjectComponent } from '../../dialogs/edit-project/edit-project.component';
import { WorkTime } from '../../models/work-time';

@Component({
	selector: 'do-projects',
	templateUrl: './projects.component.html',
	styleUrls: ['./projects.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsComponent {
	public readonly Icons = Icons;

	@Input() workTimes: WorkTime[] = [];
	@Input()
	set canEdit(canEdit: any) {
		this._canEdit = coerceBooleanProperty(canEdit);
	}
	get canEdit(): boolean {
		return this._canEdit;
	}
	private _canEdit = false;

	constructor(private dialogService: DialogService) {}

	public openEditModal(workTime: WorkTime): void {
		this.dialogService.open(EditProjectComponent, {
			width: ModalWidth.M,
			data: workTime,
		});
	}
}
