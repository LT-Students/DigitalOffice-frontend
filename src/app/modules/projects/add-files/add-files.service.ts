import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { Icons } from '@shared/modules/icons/icons';
import { BehaviorSubject, Observable } from 'rxjs';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { DialogService, ModalWidth } from '@app/services/dialog.service';
import { FileAccessType } from '@api/file-service/models/file-access-type';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { getFileIcon } from '@shared/pipes/file-icon.pipe';
import { formatBytes } from '@shared/pipes/format-bytes.pipe';
import { TableOptions } from '../../table/models/table-options';
import { EditableTextFieldParams } from '../../table/cell-components/editable-text-field/editable-text-field.component';
import { UploadProgressComponent } from './upload-progress/upload-progress.component';

export class UploadFile {
	private static uniqueId = 0;

	public id = UploadFile.uniqueId++;
	public file: File;
	public name: string;
	public accessType: FileAccessType;

	constructor(file: File) {
		this.file = file;
		this.name = file.name;
		this.accessType = FileAccessType.Public;
	}
}

@Injectable()
export class AddFilesService {
	private readonly typeMap = new Map([
		[FileAccessType.Public, 'Видно всем'],
		[FileAccessType.Team, 'Видно команде'],
		[FileAccessType.Manager, 'Видно менеджеру'],
	]);

	private dataSource = new FilesDataSource();

	constructor(
		@Inject(LOCALE_ID) private locale: string,
		@Inject(MAT_DIALOG_DATA) private entityId: string,
		private dialog: DialogService
	) {}

	public getDataSource(): FilesDataSource {
		return this.dataSource;
	}

	public getTableOptions(): TableOptions {
		return {
			rowClass: 'file-row',
			columns: [
				{
					type: 'iconCell',
					field: 'type-icon',
					valueGetter: (file: UploadFile) => getFileIcon(file.file.type),
					headerStyle: { flex: '0 0 24px', 'margin-right': '12px' },
					columnStyle: { flex: 0, 'margin-right': '12px' },
				},
				{
					type: 'editableTextFieldCell',
					field: 'name',
					headerName: 'Название',
					columnStyle: { flex: '0 0 40%', overflow: 'hidden' },
					valueGetter: (file: UploadFile) => file.name,
					params: new EditableTextFieldParams({
						updateRow: (file: UploadFile, name: string) => (file.name = name),
					}),
				},
				{
					type: 'textCell',
					field: 'size',
					headerName: 'Размер',
					valueGetter: (file: UploadFile) => formatBytes(file.file.size, this.locale),
				},
				{
					type: 'selectCell',
					field: 'access',
					headerName: 'Приватность',
					valueGetter: () => FileAccessType.Public,
					params: {
						options: [FileAccessType.Public, FileAccessType.Team, FileAccessType.Manager],
						displayValueGetter: (type: FileAccessType) => this.typeMap.get(type) as string,
						updateRow: (f: UploadFile, t: FileAccessType) => (f.accessType = t),
					},
				},
				{
					type: 'iconButtonCell',
					field: 'delete',
					valueGetter: (file: UploadFile) => file,
					headerStyle: { flex: '0 0 48px' },
					columnStyle: { flex: 0 },
					params: {
						icon: () => Icons.Delete,
						onClickFn: (file: UploadFile) => this.dataSource.removeFile(file),
					},
				},
			],
		};
	}

	public uploadFiles(): void {
		const data = { files: this.dataSource.files, entityId: this.entityId };
		this.dialog.open(UploadProgressComponent, { width: ModalWidth.S, data });
	}
}

class FilesDataSource implements DataSource<UploadFile> {
	private filesSubject = new BehaviorSubject<UploadFile[]>([]);

	public get files(): UploadFile[] {
		return this.filesSubject.value;
	}

	public get haveFiles(): boolean {
		return !!this.filesSubject.value.length;
	}

	constructor() {}

	public connect(collectionViewer: CollectionViewer): Observable<UploadFile[]> {
		return this.filesSubject.asObservable();
	}

	public disconnect(collectionViewer: CollectionViewer): void {}

	public addFiles(files: FileList): void {
		const newFiles = Array.from(files).map((f: File) => new UploadFile(f));
		const oldFiles = this.filesSubject.value;
		this.filesSubject.next([...oldFiles, ...newFiles]);
	}

	public removeFile(file: UploadFile): void {
		const filteredFiles = this.filesSubject.value.filter((f: UploadFile) => file.id !== f.id);
		this.filesSubject.next(filteredFiles);
	}
}
