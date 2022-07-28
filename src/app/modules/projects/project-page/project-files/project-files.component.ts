import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Icons } from '@shared/modules/icons/icons';
import { map } from 'rxjs/operators';
import { ProjectResponse } from '@api/project-service/models/project-response';
import { DialogService, ModalWidth } from '@app/services/dialog.service';
import { SelectedProjectService } from '../../project-id-route-container/selected-project.service';
import { AddFilesComponent } from '../../add-files/add-files.component';
import { ContextMenuService } from './context-menu.service';
import { ProjectFilesService } from './project-files.service';

@Component({
	selector: 'do-project-files',
	templateUrl: './project-files.component.html',
	styleUrls: ['./project-files.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [ProjectFilesService, ContextMenuService],
})
export class ProjectFilesComponent implements OnInit {
	public readonly Icons = Icons;

	public filterData = this.filesService.getFilterData();
	public tableColumns = this.filesService.getTableColumns();
	public contextMenuItems = this.contextMenu.getItems();
	public dataSource = this.selectedProject.info$.pipe(map((p: ProjectResponse) => p.files || []));

	constructor(
		private filesService: ProjectFilesService,
		private selectedProject: SelectedProjectService,
		private contextMenu: ContextMenuService,
		private dialog: DialogService
	) {}

	ngOnInit(): void {}

	public addFiles(): void {
		this.dialog.open(AddFilesComponent, { width: ModalWidth.M, autoFocus: false });
	}
}
