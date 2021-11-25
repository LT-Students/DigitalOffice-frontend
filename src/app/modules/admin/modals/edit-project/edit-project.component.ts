import { Component, ChangeDetectionStrategy, ChangeDetectorRef, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DepartmentInfo } from '@data/api/user-service/models/department-info';
import { ProjectService } from '@app/services/project/project.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { InitialDataEditRequest, ProjectPath } from '@app/types/edit-request';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DepartmentService } from '@app/services/department/department.service';
import { IProjectStatusType, ProjectTypeModel } from '@app/models/project/project-status';
import { createEditRequest } from '@app/utils/utils';

@Component({
	selector: 'do-edit-project',
	templateUrl: './edit-project.component.html',
	styleUrls: ['./edit-project.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditProjectComponent {
	public ProjectPath = ProjectPath;

	public projectForm: FormGroup;
	public departments: Observable<Array<DepartmentInfo> | undefined>;
	public statuses: IProjectStatusType[];
	public projectInfo: any;
	private readonly _initialData: InitialDataEditRequest<ProjectPath>;

	constructor(
		private _formBuilder: FormBuilder,
		private _projectService: ProjectService,
		private _departmentService: DepartmentService,
		private _cdr: ChangeDetectorRef,
		private _dialogRef: MatDialogRef<EditProjectComponent>,
		@Inject(MAT_DIALOG_DATA) private _data: { projectInfo: any[] }
	) {
		this.statuses = ProjectTypeModel.getAllProjectTypes();

		this.projectInfo = this._data.projectInfo;

		this._initialData = {
			[ProjectPath.NAME]: [this.projectInfo.name, [Validators.required, Validators.maxLength(150)]],
			[ProjectPath.DEPARTMENT_ID]: [this.projectInfo.department?.id ?? null, [Validators.required]],
			[ProjectPath.DESCRIPTION]: [this.projectInfo.description, [Validators.maxLength(300)]],
			[ProjectPath.SHORT_DESCRIPTION]: [this.projectInfo.shortDescription],
			[ProjectPath.STATUS]: [this.projectInfo.status],
		};

		this.projectForm = this._formBuilder.group(this._initialData);
		this.departments = this._departmentService
			.findDepartments({ skipCount: 0, takeCount: 100 })
			.pipe(map((value) => value.body));
	}

	public onClose(): void {
		this._dialogRef.close();
	}

	public editProject(): void {
		const editRequest = createEditRequest(this.projectForm.getRawValue(), this._initialData);

		this._projectService.editProject({ projectId: this.projectInfo.id, body: editRequest }).subscribe();
	}
}
