import { Injectable, ViewContainerRef } from '@angular/core';
import { MenuItem } from '@shared/component/context-menu/menu-item';
import { Icons } from '@shared/modules/icons/icons';
import { DialogService, ModalWidth } from '@app/services/dialog.service';
import { ContextMenuComponent } from '@shared/component/context-menu/context-menu.component';
import { FileInfo } from '@api/project-service/models/file-info';
import { catchError, filter, first, switchMap, tap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { I18nPluralPipe } from '@angular/common';
import { Project, SelectedProjectService } from '../../../project-id-route-container/selected-project.service';
import { EditFileComponent } from '../edit-file/edit-file.component';
import { ProjectService } from '../../../project.service';

@Injectable()
export class ContextMenuService {
	private contextMenu?: ContextMenuComponent;

	constructor(
		private dialog: DialogService,
		private selectedProject: SelectedProjectService,
		private projectService: ProjectService,
		private pluralPipe: I18nPluralPipe,
		private viewContainerRef: ViewContainerRef
	) {}

	public setContextMenu(contextMenu: ContextMenuComponent): void {
		this.contextMenu = contextMenu;
	}

	public openContextMenu(event: MouseEvent, file: FileInfo) {
		this.contextMenu?.openContextMenu(event, file);
	}

	public getItems(): MenuItem[] {
		return [
			{
				title: 'Редактировать документ',
				icon: Icons.Edit,
				action: (file: FileInfo) => this.editFile(file),
				visible: (file: FileInfo | FileInfo[]) => !Array.isArray(file),
			},
			{
				title: 'Удалить документ',
				icon: Icons.Delete,
				action: (files: FileInfo | FileInfo[]) => this.removeFiles(files),
				visible: () => true,
			},
			{
				title: 'Скачать',
				icon: Icons.Download,
				action: (files: FileInfo | FileInfo[]) => this.projectService.downloadFile(files),
				visible: () => true,
			},
		];
	}

	private editFile(file: FileInfo): void {
		this.dialog
			.open<FileInfo>(EditFileComponent, {
				width: ModalWidth.M,
				data: file,
				viewContainerRef: this.viewContainerRef,
			})
			.afterClosed()
			.pipe(
				switchMap((newFile?: FileInfo) =>
					newFile
						? this.selectedProject.files$.pipe(
								first(),
								tap((files: FileInfo[]) => {
									const newFiles = files.map((f: FileInfo) => (f.id === newFile.id ? newFile : f));
									this.selectedProject.setProject({ files: newFiles });
								})
						  )
						: EMPTY
				)
			)
			.subscribe();
	}

	public removeFiles(files: FileInfo | FileInfo[]): void {
		const fileIds = (!Array.isArray(files) ? [files] : files).map((f: FileInfo) => f.id);
		const deleteMessage =
			Array.isArray(files) && files.length > 1
				? `Вы действительно хотите удалить ${this.pluralPipe.transform(files.length, {
						one: '# документ',
						few: '# документа',
						other: '# документов',
				  })}?`
				: `Вы действительно хотите удалить документ <span class="text-accent_controls_default">${
						(Array.isArray(files) ? files[0] : files).name
				  }</span>?`;

		this.selectedProject.project$
			.pipe(
				filter((p: Project | null): p is Project => !!p),
				first(),
				switchMap((p: Project) => {
					const projectId = p.info.project.id;
					const oldFiles = p.files;
					const newFiles = p.files.filter((f: FileInfo) => !fileIds.includes(f.id));

					return this.dialog
						.confirm({
							title: 'Удаление документа',
							confirmText: 'Удалить',
							message: deleteMessage,
							action$: this.projectService.removeFiles(projectId, fileIds).pipe(
								tap(() => this.selectedProject.setProject({ files: newFiles })),
								catchError(() => {
									this.selectedProject.setProject({ files: oldFiles });
									return EMPTY;
								})
							),
						})
						.afterClosed();
				})
			)
			.subscribe();
	}
}
