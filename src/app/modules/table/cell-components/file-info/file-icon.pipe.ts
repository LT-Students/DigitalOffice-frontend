import { Pipe, PipeTransform } from '@angular/core';
import { FileInfo } from '@api/file-service/models/file-info';
import { Icons } from '@shared/modules/icons/icons';

@Pipe({
	name: 'fileIcon',
})
export class FileIconPipe implements PipeTransform {
	transform(file: FileInfo): Icons {
		return Icons.Folder;
	}
}
