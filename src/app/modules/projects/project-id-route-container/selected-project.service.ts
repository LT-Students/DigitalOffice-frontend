import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProjectResponse } from '@api/project-service/models/project-response';
import { UserInfo } from '@api/project-service/models/user-info';
import { filter, first, map, switchMap } from 'rxjs/operators';
import { FileInfo } from '@api/project-service/models/file-info';
import { ProjectService } from '../project.service';

export interface Project {
	info: ProjectResponse;
	users: UserInfo[];
	files: FileInfo[];
}

@Injectable()
export class SelectedProjectService {
	private project = new BehaviorSubject<Project | null>(null);
	public project$ = this.project.asObservable();

	public get info$(): Observable<ProjectResponse> {
		return this.project$.pipe(
			filter((p: Project | null): p is Project => !!p),
			map((project: Project) => project.info)
		);
	}
	public get users$(): Observable<UserInfo[]> {
		return this.project$.pipe(
			filter((p: Project | null): p is Project => !!p),
			map((project: Project) => project.users)
		);
	}
	public get files$(): Observable<FileInfo[]> {
		return this.project$.pipe(
			filter((p: Project | null): p is Project => !!p),
			map((project: Project) => project.files)
		);
	}

	constructor(private projectService: ProjectService) {}

	public setProject(partialProject: Partial<Project>): void {
		this.project$.pipe(first()).subscribe({
			next: (previous: Project | null) => {
				if (previous) {
					const newValue = { ...previous, ...partialProject };
					this.project.next(newValue);
				} else {
					this.project.next(partialProject as Project);
				}
			},
		});
	}

	public refreshFiles(): void {
		this.info$
			.pipe(
				first(),
				switchMap((p: ProjectResponse) => this.projectService.findFiles(p.project.id))
			)
			.subscribe({
				next: (files: FileInfo[]) => this.setProject({ files }),
			});
	}
}
