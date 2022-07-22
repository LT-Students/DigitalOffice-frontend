import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Icons } from '@shared/modules/icons/icons';
import { forkJoin, fromEvent, Observable, of } from 'rxjs';
import { finalize, first, switchMap, withLatestFrom } from 'rxjs/operators';
import { FileInfo } from '@api/project-service/models/file-info';
import { AccessType } from '@api/project-service/models/access-type';
import { ProjectResponse } from '@api/project-service/models/project-response';
import { SelectedProjectService } from '../../project-id-route-container/selected-project.service';
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
	public dataSource = [{}, {}, {}];

	constructor(
		private filesService: ProjectFilesService,
		private selectedProject: SelectedProjectService,
		private contextMenu: ContextMenuService
	) {}

	ngOnInit(): void {}

	public addFiles(): void {
		let input: HTMLInputElement | null = document.createElement('input');
		input.type = 'file';
		input.multiple = true;

		fromEvent(input, 'change')
			.pipe(
				first(),
				finalize(() => (input = null)),
				switchMap((event: Event) => {
					const files = Array.from((event.target as HTMLInputElement).files || []);

					return forkJoin(files.map((f: File) => of(f).pipe(switchMap((file) => this.readFile(file)))));
				}),
				withLatestFrom(this.selectedProject.project$),
				switchMap(([files, project]: [FileInfo[], ProjectResponse]) =>
					this.filesService.addFiles(project.project.id, files)
				)
			)
			.subscribe();
		input.click();
	}
	private readFile(file: File): Observable<FileInfo> {
		return new Observable<FileInfo>((subscriber) => {
			const fileReader = new FileReader();

			fileReader.onloadend = () => {
				const newFile: FileInfo = {
					access: AccessType.Public,
					name: file.name,
					content: fileReader.result as string,
					extension: file.type,
				};
				subscriber.next(newFile);
				subscriber.complete();
			};
			fileReader.onerror = () => subscriber.error();

			fileReader.readAsDataURL(file);
		});
	}
}
