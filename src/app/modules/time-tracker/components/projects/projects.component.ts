import { ChangeDetectionStrategy, Component, Input, ViewContainerRef } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { DialogService, ModalWidth } from '@shared/component/dialog/dialog.service';
import { Icons } from '@shared/modules/icons/icons';
import { isGUIDEmpty } from '@app/utils/utils';
import { EditProjectComponent } from '../../dialogs/edit-project/edit-project.component';
import { WorkTime } from '../../models';

@Component({
	selector: 'do-projects',
	templateUrl: './projects.component.html',
	styleUrls: ['./projects.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsComponent {
	public readonly Icons = Icons;

	@Input()
	set workTimes(wts: WorkTime[]) {
		this._workTimes = wts.sort((wt1: WorkTime, wt2: WorkTime) => {
			if (isGUIDEmpty(wt1.project.id)) {
				return 1;
			}
			if (isGUIDEmpty(wt2.project.id)) {
				return -1;
			}

			return (wt1.project.shortName as string).localeCompare(wt2.project.shortName as string);
		});
	}
	get workTimes(): WorkTime[] {
		return this._workTimes;
	}
	private _workTimes: WorkTime[] = [];

	@Input()
	set canEdit(canEdit: any) {
		this._canEdit = coerceBooleanProperty(canEdit);
	}
	get canEdit(): boolean {
		return this._canEdit;
	}
	private _canEdit = false;

	constructor(private dialogService: DialogService, private viewContainerRef: ViewContainerRef) {}

	public openEditModal(workTime: WorkTime): void {
		this.dialogService.open(EditProjectComponent, {
			width: ModalWidth.M,
			data: workTime,
			viewContainerRef: this.viewContainerRef,
		});
	}
}
