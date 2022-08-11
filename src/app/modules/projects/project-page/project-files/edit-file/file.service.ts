import { Injectable } from '@angular/core';
import { FileApiService } from '@api/file-service/services/file-api.service';
import { FileAccessType } from '@api/project-service/models/file-access-type';
import { OperationResultResponse } from '@app/types/operation-result-response.interface';
import { Observable } from 'rxjs';
import { ProjectService } from '../../../project.service';

@Injectable({
	providedIn: 'root',
})
export class FileService {
	constructor(private fileApi: FileApiService, private projectService: ProjectService) {}

	public editFileName(projectId: string, fileId: string, newName: string): Observable<OperationResultResponse> {
		return this.fileApi.editFile({ entityId: projectId, fileId, newName });
	}

	public editFileAccess(fileId: string, newAccessType: FileAccessType): Observable<OperationResultResponse> {
		return this.projectService.editFileAccess(fileId, newAccessType);
	}
}
