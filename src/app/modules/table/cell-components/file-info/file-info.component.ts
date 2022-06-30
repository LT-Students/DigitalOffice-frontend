import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FileInfo } from '@api/file-service/models/file-info';
import { TableCell } from '../../models';

@Component({
	selector: 'do-file-info',
	templateUrl: './file-info.component.html',
	styleUrls: ['./file-info.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileInfoComponent implements OnInit, TableCell<FileInfo> {
	public set value(file: FileInfo) {
		this.file = file;
	}
	public file!: FileInfo;

	constructor() {}

	ngOnInit(): void {}
}
