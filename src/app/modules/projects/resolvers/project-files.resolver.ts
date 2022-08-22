import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { FileInfo } from '@api/project-service/models/file-info';
import { ProjectService } from '../project.service';

@Injectable({
	providedIn: 'root',
})
export class ProjectFilesResolver implements Resolve<FileInfo[]> {
	constructor(private projectService: ProjectService) {}

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<FileInfo[]> {
		return this.projectService.findFiles(route.params.id);
	}
}
