import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FileApiService } from '@api/file-service/services/file-api.service';
import { FileAccessType } from '@api/file-service/models/file-access-type';
import { HttpClient, HttpEvent } from '@angular/common/http';

@Injectable({
	providedIn: 'root',
})
export class FileService {
	constructor(private fileService: FileApiService, private http: HttpClient) {}

	public createFile(params: {
		entityId: string;
		access: FileAccessType;
		file: File;
		fileName?: string;
	}): Observable<HttpEvent<any>> {
		const { file, access, fileName, entityId } = params;
		const formData = new FormData();
		formData.append('uploadedFiles', file, fileName);
		return this.http.post(this.fileService.rootUrl + FileApiService.CreateFilePath, formData, {
			reportProgress: true,
			observe: 'events',
			params: {
				entityId,
				access,
			},
		});
	}
}
