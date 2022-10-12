import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { Icons } from '@shared/modules/icons/icons';
import { first, map, switchMap, tap } from 'rxjs/operators';
import { ProjectResponse } from '@api/project-service/models/project-response';
import { DialogService, ModalWidth } from '@shared/component/dialog/dialog.service';
import { ContextMenuComponent } from '@shared/component/context-menu/context-menu.component';
import { FileInfo } from '@api/project-service/models/file-info';
import { BehaviorSubject } from 'rxjs';
import { I18nPluralPipe } from '@angular/common';
import { SelectedProjectService } from '../../project-id-route-container/selected-project.service';
import { AddFilesComponent } from '../../add-files/add-files.component';
import { TableComponent } from '../../../table/table.component';
import { FilterEvent } from '../../../dynamic-filter/dynamic-filter.component';
import { ContextMenuService } from './services/context-menu.service';
import { ProjectFilesService } from './services/project-files.service';

@Component({
	selector: 'do-project-files',
	templateUrl: './project-files.component.html',
	styleUrls: ['./project-files.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [ProjectFilesService, ContextMenuService, I18nPluralPipe],
})
export class ProjectFilesComponent implements OnInit {
	public readonly Icons = Icons;

	@ViewChild(ContextMenuComponent, { static: true }) contextMenu!: ContextMenuComponent;
	@ViewChild(TableComponent, { static: true }) table!: TableComponent<FileInfo>;

	public nameFilter = new BehaviorSubject<FilterEvent | null>(null);

	public filterData = this.filesService.getFilterData();
	public tableColumns = this.filesService.getTableColumns();
	public contextMenuItems = this.contextMenuService.getItems();
	public dataSource = this.selectedProject.files$.pipe(
		tap((files: FileInfo[]) => {
			const selected = this.table.selection.selected.filter((f: FileInfo) => files.includes(f));
			this.table.selection.setSelection(...selected);
		}),
		switchMap((files: FileInfo[]) =>
			this.nameFilter.pipe(
				map((filter: FilterEvent | null) =>
					files.filter((f: FileInfo) => f.name.includes(filter?.['name'] || ''))
				)
			)
		)
	);

	constructor(
		private filesService: ProjectFilesService,
		private selectedProject: SelectedProjectService,
		private contextMenuService: ContextMenuService,
		private dialog: DialogService
	) {}

	public ngOnInit(): void {
		this.contextMenuService.setContextMenu(this.contextMenu);
	}

	public clearSelection(): void {
		this.table.selection.clear();
	}

	public addFiles(): void {
		this.selectedProject.info$
			.pipe(
				first(),
				map((p: ProjectResponse) => p.id),
				switchMap((projectId: string) => {
					return this.dialog.open(AddFilesComponent, {
						width: ModalWidth.M,
						autoFocus: false,
						data: projectId,
					}).closed;
				}),
				tap(() => this.selectedProject.refreshFiles())
			)
			.subscribe();
	}
}
