import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DepartmentInfo } from '@data/api/user-service/models/department-info';
import { ProjectStatus } from '@app/models/project/project-status';
import { ProjectService } from '@app/services/project/project.service';
import { NetService } from '@app/services/net.service';
import { ProjectStatusType } from '@data/api/project-service/models/project-status-type';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PatchRequest, ProjectPath } from '@app/types/patch-paths';
import { ProjectPatchDocument } from '@data/api/project-service/models/project-patch-document';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
	selector: 'do-edit-project',
	templateUrl: './edit-project.component.html',
	styleUrls: ['./edit-project.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditProjectComponent {
	public projectForm: FormGroup;
	public departments: Observable<Array<DepartmentInfo> | undefined>;
	public statuses: ProjectStatus[];
	public projectInfo: any;
	private _initialData: PatchRequest<ProjectPath>;

	constructor(
		private _formBuilder: FormBuilder,
		private _projectService: ProjectService,
		private _netService: NetService,
		private _cdr: ChangeDetectorRef,
		private _dialogRef: MatDialogRef<EditProjectComponent>,
		@Inject(MAT_DIALOG_DATA) private _data: { projectInfo: any[] }
	) {
		this.statuses = [
			new ProjectStatus(ProjectStatusType.Active),
			new ProjectStatus(ProjectStatusType.Closed),
			new ProjectStatus(ProjectStatusType.Suspend),
		];

		this.projectInfo = this._data.projectInfo;

		this._initialData = {
			'/Name': [this.projectInfo.name, [Validators.required, Validators.maxLength(150)]],
			'/DepartmentId': [this.projectInfo.department.id, [Validators.required]],
			'/Description': [this.projectInfo.description, [Validators.maxLength(300)]],
			'/ShortDescription': [this.projectInfo.shortDescription],
			'/Status': [this.projectInfo.status],
		};

		this.projectForm = this._formBuilder.group(this._initialData);
		this.departments = this._netService
			.getDepartmentsList({ skipCount: 0, takeCount: 100 })
			.pipe(map((value) => value.body));
	}

	public onClose(): void {
		this._dialogRef.close();
	}

	public editProject(): void {
		const editRequest = (Object.keys(this.projectForm.controls) as ProjectPath[]).reduce(
			(acc: ProjectPatchDocument[], key) => {
				const formValue = this.projectForm.get(key)?.value;
				if (formValue !== this._initialData[key][0]) {
					const patchDocument: ProjectPatchDocument = {
						op: 'replace',
						path: key,
						value: formValue,
					};
					acc.push(patchDocument);
				}
				return acc;
			},
			[]
		);
		this._projectService.editProject({ projectId: this.projectInfo.id, body: editRequest }).subscribe();
	}
}
