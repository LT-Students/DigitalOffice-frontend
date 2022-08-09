import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FileApiService } from '@api/file-service/services/file-api.service';
import { FileAccessType } from '@api/file-service/models/file-access-type';
import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { map } from 'rxjs/operators';

export interface FileDownload {
	contentType: string;
	fileContents: string;
	fileDownloadName: string;
}

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

	public downloadFile(fileId: string): Observable<HttpEvent<FileDownload>> {
		return this.http
			.get(this.fileService.rootUrl + FileApiService.GetFilePath, {
				reportProgress: true,
				observe: 'events',
				params: {
					filesIds: [fileId],
				},
			})
			.pipe(
				map((res) =>
					res.type === HttpEventType.Response
						? ({ ...res, body: (res.body as FileDownload[])[0] } as HttpEvent<FileDownload>)
						: res
				)
			);
	}
}
