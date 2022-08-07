import { Component, OnInit, ChangeDetectionStrategy, Optional } from '@angular/core';
import { NavigationService } from '@app/services/navigation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectResponse } from '@api/project-service/models/project-response';
import { first, map } from 'rxjs/operators';
import { ProjectInfo } from '@api/project-service/models/project-info';
import { BehaviorSubject } from 'rxjs';
import { AppRoutes } from '@app/models/app-routes';
import { SelectedProjectService } from '../project-id-route-container/selected-project.service';
import { ProjectService } from '../project.service';
import { CreateProjectService } from './services/create-project.service';
import { CreateEditProject } from './create-edit-project';
import { EditProjectService } from './services/edit-project.service';
import { ProjectFormService } from './services/project-form.service';

function serviceFactory(projectService: ProjectService, selectedProject: SelectedProjectService): CreateEditProject {
	return selectedProject
		? new EditProjectService(projectService, selectedProject)
		: new CreateProjectService(projectService);
}

@Component({
	selector: 'do-create-edit-project',
	templateUrl: './create-edit-project.component.html',
	styleUrls: ['./create-edit-project.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		ProjectFormService,
		{
			provide: CreateEditProject,
			useFactory: serviceFactory,
			deps: [ProjectService, [new Optional(), SelectedProjectService]],
		},
	],
})
export class CreateEditProjectComponent implements OnInit {
	public form = this.projectForm.form;
	public isEditMode = this.createEditProject.isEditMode;
	public pageTitle = this.createEditProject.pageConfig.title;
	public submitButton = this.createEditProject.pageConfig.submitButtonLabel;
	public projectName?: string;
	public loading$ = new BehaviorSubject(false);

	constructor(
		@Optional() private selectedProject: SelectedProjectService,
		private projectForm: ProjectFormService,
		private createEditProject: CreateEditProject,
		private navigation: NavigationService,
		private route: ActivatedRoute,
		private router: Router
	) {}

	public ngOnInit(): void {
		if (this.isEditMode) {
			this.selectedProject.info$
				.pipe(
					first(),
					map((projectRes: ProjectResponse) => projectRes.project)
				)
				.subscribe({
					next: (project: ProjectInfo) => {
						this.projectForm.setInitialValue(project);
						this.projectName = project.name;
					},
				});
		}
	}

	public onCancel(): void {
		this.navigation.back('..', this.route);
	}

	public onSubmit(): void {
		if (this.form.invalid) {
			this.form.markAllAsTouched();
			return;
		}
		this.loading$.next(true);
		const submitValue = this.projectForm.getSubmitValue();
		this.createEditProject.submit$(submitValue).subscribe({
			next: (projectId: string) => {
				this.router.navigateByUrl(`/${AppRoutes.Projects}/${projectId}`);
			},
			error: () => this.loading$.next(false),
		});
	}
}
