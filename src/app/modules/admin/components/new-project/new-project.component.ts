import { ComponentType } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DepartmentInfo } from '@data/api/user-service/models/department-info';
import { ProjectStatus } from '@app/models/project-status';
import { ProjectStatusType } from '@data/api/project-service/models/project-status-type';
import { ProjectService } from '@app/services/project.service';
import { ModalService, ModalType, UserSearchModalConfig } from '@app/services/modal.service';
import { NetService } from '@app/services/net.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProjectRequest } from '@data/api/project-service/models/project-request';
import { UserInfo } from '@data/api/user-service/models/user-info';
import { ProjectUserRequest } from '@data/api/project-service/models/project-user-request';
import { UserRoleType } from '@data/api/project-service/models/user-role-type';
import { ErrorResponse } from '@data/api/project-service/models/error-response';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { WorkFlowMode } from '../../../employee/employee-page.component';
import { RouteType } from '../../../../app-routing.module';
import { UserSearchComponent } from './modals/user-search/user-search.component';
import { DeleteDirectionComponent, ModalApprovalConfig } from './modals/delete-direction/delete-direction.component';
import { Team, teamCards, TeamMember } from './team-cards';

@Component({
	selector: 'do-new-project',
	templateUrl: './new-project.component.html',
	styleUrls: ['./new-project.component.scss'],
})
export class NewProjectComponent implements OnInit {
	public projectForm: FormGroup;
	public teams: Team[];
	// TODO: REPLACE WITH API
	public departments: DepartmentInfo[];
	public statuses: ProjectStatus[];
	public membersAll: UserInfo[];

	constructor(
		public dialog: MatDialog,
		private formBuilder: FormBuilder,
		private _projectService: ProjectService,
		private _modalService: ModalService,
		private _netService: NetService,
		private _snackBar: MatSnackBar,
		private _location: Location,
		private _router: Router,
	) {
		this.statuses = [
			new ProjectStatus(ProjectStatusType.Active),
			new ProjectStatus(ProjectStatusType.Closed),
			new ProjectStatus(ProjectStatusType.Suspend),
		];
		this.teams = [];
		this.membersAll = [];
	}

	ngOnInit(): void {
		this.projectForm = this.formBuilder.group({
			name: ['', [Validators.required, Validators.maxLength(80)]],
			departmentId: ['', [Validators.required]],
			description: [null],
			status: [ProjectStatusType.Active],
			// customer: [''],
			// shortName: ['', [Validators.required, Validators.maxLength(32)]],
			// departments: ['', [Validators.required, Validators.maxLength(32)]],
			// checkControl: ['', [Validators.required]],
			// additionInfo: [''],
			// picker: [''],
		});

		this._getDepartments();

		// this.teams.forEach((team: Team) => this._sortLeads(team));
	}

	private _getDepartments(): void {
		this._netService.getDepartmentsList().subscribe(
			(data: DepartmentInfo[]) => {
				this.departments = data;
			},
			(error) => console.log(error)
		);
	}

	public addMember(): void {
		const modalData: UserSearchModalConfig = { mode: WorkFlowMode.ADD, members: this.membersAll };
		const dialogRef = this._modalService.openModal(UserSearchComponent, modalData);
		dialogRef.afterClosed().subscribe((result: UserInfo[]) => {
			this.membersAll = result.length ? [...result] : [];
		});
	}

	public createProject(): void {
		const projectUsers: ProjectUserRequest[] = this.membersAll.map((user) => ({ role: UserRoleType.ProjectAdmin, userId: user.id }));
		const projectRequest: ProjectRequest = { ...this.projectForm.value, users: projectUsers };
		this._projectService.createProject(projectRequest).subscribe(
			(result) => {
				this._snackBar.open('Project successfully created', 'Закрыть', { duration: 3000 });
				this._router.navigate([`${RouteType.PROJECT}/${result.body.id}`]);
			},
			(error) => {
				console.log(typeof error);
				this._snackBar.open(error.message, 'Закрыть');
			}
		);
	}

	public onAddTeamClick(): void {
		this.addMember();
	}

	public showProjectTeam(): void {
		const configData: UserSearchModalConfig = {
			team: { name: 'all', members: this._getAllMembers() },
			mode: WorkFlowMode.VIEW,
		};
		this._modalService.openModal(UserSearchComponent, configData);
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
		return this.teams.map((team: Team) => team.members).reduce((prev: TeamMember[], currentValue: TeamMember[]) => prev.concat(currentValue), []);
	}

	private _sortLeads(team: Team): void {
		const leads: TeamMember[] = team.members.filter((member: TeamMember) => member.lead);
		const ordinary: TeamMember[] = team.members.filter((member: TeamMember) => !member.lead);
		team.members = [...leads, ...ordinary];
	}
}
