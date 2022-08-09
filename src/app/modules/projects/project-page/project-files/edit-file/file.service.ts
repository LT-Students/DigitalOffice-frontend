import { Injectable } from '@angular/core';
import { FileApiService } from '@api/file-service/services/file-api.service';

@Injectable({
	providedIn: 'root',
})
export class FileService {
	constructor(private fileApi: FileApiService) {}

	public editFile() {
		// return this.fileApi.editFile({});
	}
}
