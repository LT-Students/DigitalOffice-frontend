import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DepartmentInfo } from '@data/api/user-service/models/department-info';
import { ProjectStatus } from '@app/models/project/project-status';
import { UserInfo } from '@data/api/user-service/models/user-info';
import { ICreateProjectRequest, ProjectService } from '@app/services/project/project.service';
import { ModalService, ModalWidth, UserSearchModalConfig } from '@app/services/modal.service';
import { NetService } from '@app/services/net.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ProjectStatusType } from '@data/api/project-service/models/project-status-type';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Team } from '../../components/new-project/team-cards';

@Component({
	selector: 'do-edit-project',
	templateUrl: './edit-project.component.html',
	styleUrls: ['./edit-project.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditProjectComponent implements OnInit {
	public projectForm: FormGroup;
	public teams: Team[];
	public departments: DepartmentInfo[];
	public statuses: ProjectStatus[];
	public membersAll: UserInfo[];
	public pluralTeamCount: { [k: string]: string };
	public projectInfo: any;

	constructor(
		private _formBuilder: FormBuilder,
		private _projectService: ProjectService,
		private _modalService: ModalService,
		private _netService: NetService,
		private _snackBar: MatSnackBar,
		private _location: Location,
		private _router: Router,
		private _cdr: ChangeDetectorRef,
		private _dialogRef: MatDialogRef<EditProjectComponent>,
		@Inject(MAT_DIALOG_DATA) private _data: { projectInfo: any[] }
	) {
		this.pluralTeamCount = {
			few: '# человека',
			other: '# человек',
		};
		this.statuses = [
			new ProjectStatus(ProjectStatusType.Active),
			new ProjectStatus(ProjectStatusType.Closed),
			new ProjectStatus(ProjectStatusType.Suspend),
		];
		this.teams = [];
		this.membersAll = [];
		this.departments = [];
		this.projectInfo = this._data.projectInfo;

		this.projectForm = this._formBuilder.group({
			name: [this.projectInfo.name, [Validators.required, Validators.maxLength(150)]],
			departmentId: ['', [Validators.required]],
			description: [this.projectInfo.description, [Validators.maxLength(300)]],
			shortDescription: [this.projectInfo.shortDescription],
			status: [this.projectInfo.status],
		});
	}

	ngOnInit(): void {
		this._getDepartments();
		console.log(this.projectInfo);
	}

	private _getDepartments(): void {
		this._netService.getDepartmentsList({ skipCount: 0, takeCount: 100 }).subscribe(
			(data) => {
				this.departments = data.body ?? [];
			},
			(error) => console.log(error)
		);
	}

	public saveDraft(): void {
		console.log('Сохранить черновик');
	}

	public goBack(): void {
		this._location.back();
	}

	public onClose(): void {
		this._dialogRef.close();
	}
}
