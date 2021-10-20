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
import { ProjectUserRequest } from '@data/api/project-service/models/project-user-request';
import { ProjectUserRoleType } from '@data/api/project-service/models/project-user-role-type';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProjectInfo } from '@data/api/project-service/models/project-info';
import { RouteType } from '../../../../app-routing.module';
import { UserSearchComponent } from '../../components/new-project/modals/user-search/user-search.component';
import { WorkFlowMode } from '../../../employee/employee-page.component';
import { Team, TeamMember } from '../../components/new-project/team-cards';

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

	public addMember(): void {
		const modalData: UserSearchModalConfig = { mode: WorkFlowMode.ADD, members: this.membersAll };
		this._modalService
			.openModal<UserSearchComponent, UserSearchModalConfig, UserInfo[]>(
				UserSearchComponent,
				ModalWidth.L,
				modalData
			)
			.afterClosed()
			.subscribe((result?: UserInfo[]) => {
				if (result?.length) {
					this.membersAll = [...result];
					this._cdr.detectChanges();
				}
			});
	}

	// public createProject(): void {
	// 	const projectUsers: ProjectUserRequest[] = this.membersAll.map((user) => ({
	// 		role: ProjectUserRoleType.Manager,
	// 		userId: user.id ?? '',
	// 	}));
	// 	const projectRequest: ICreateProjectRequest = {
	// 		name: this.projectForm.get('name')?.value?.trim(),
	// 		departmentId: this.projectForm.get('departmentId')?.value,
	// 		description: this.projectForm.get('description')?.value?.trim(),
	// 		shortDescription: this.projectForm.get('shortDescription')?.value?.trim(),
	// 		status: this.projectForm.get('status')?.value,
	// 		users: projectUsers,
	// 		projectImages: [],
	// 	};
	// 	this._projectService.createProject(projectRequest).subscribe(
	// 		(result) => {
	// 			this._snackBar.open('Project successfully created', 'Закрыть', { duration: 3000 });
	// 			this._router.navigate([`${RouteType.PROJECT}/${result.body}`]);
	// 		},
	// 		(error) => {
	// 			let errorMessage = error.error.errors;
	// 			if (error.status === 409) {
	// 				errorMessage = 'Проект с таким названием уже существует';
	// 			}
	// 			this._snackBar.open(errorMessage, 'accept');
	// 			throw error;
	// 		}
	// 	);
	// }

	public showProjectTeam(): void {
		const configData: UserSearchModalConfig = {
			team: { name: 'all', members: this._getAllMembers() },
			mode: WorkFlowMode.VIEW,
		};
		this._modalService.openModal(UserSearchComponent, ModalWidth.L, configData);
	}

	public saveDraft(): void {
		console.log('Сохранить черновик');
	}

	public totalMembersCount(): number {
		return this.membersAll.length;
		// return this.teams.map((team: Team) => team.members.length).reduce((sum: number, teamTotalNumber) => sum + teamTotalNumber, 0);
	}

	public goBack(): void {
		this._location.back();
	}

	private _getAllMembers(): TeamMember[] {
		return this.teams
			.map((team: Team) => team.members)
			.reduce((prev: TeamMember[], currentValue: TeamMember[]) => prev.concat(currentValue), []);
	}

	private _sortLeads(team: Team): void {
		const leads: TeamMember[] = team.members.filter((member: TeamMember) => member.lead);
		const ordinary: TeamMember[] = team.members.filter((member: TeamMember) => !member.lead);
		team.members = [...leads, ...ordinary];
	}

	public onClose(): void {
		this._dialogRef.close();
	}
}
