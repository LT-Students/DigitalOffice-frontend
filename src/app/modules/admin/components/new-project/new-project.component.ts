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
import { WorkFlowMode } from '../../../employee/employee-page.component';
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

	constructor(
		public dialog: MatDialog,
		private formBuilder: FormBuilder,
		private _projectService: ProjectService,
		private _modalService: ModalService,
		private _netService: NetService,
		private _snackBar: MatSnackBar
	) {
		this.statuses = [
			new ProjectStatus(ProjectStatusType.Active),
			new ProjectStatus(ProjectStatusType.Closed),
			new ProjectStatus(ProjectStatusType.Suspend),
		];
		this.teams = [];
	}

	ngOnInit(): void {
		this.projectForm = this.formBuilder.group({
			name: ['', [Validators.required, Validators.maxLength(80)]],
			description: ['', [Validators.required, Validators.maxLength(500)]],
			departmentId: [''],
			customer: [''],
			status: [''],
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
		const modalData: UserSearchModalConfig = { mode: WorkFlowMode.ADD };
		const dialogRef = this._modalService.openModal(UserSearchComponent, modalData);
		// dialogRef.afterClosed().subscribe((result) => {
		// 	const newTeam: Team = {
		// 		name: result.role as string,
		// 		members: result.users,
		// 	};
		// 	this.teams.push(newTeam);
		// });
	}

	public createProject(): void {
		const projectRequest: ProjectRequest = this.projectForm.value;
		this._projectService.createProject(projectRequest).subscribe(
			(result) => {
				this._snackBar.open('Project successfully created', 'Закрыть', { duration: 3000 });
			},
			(error) => {
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
		return this.teams.map((team: Team) => team.members.length).reduce((sum: number, teamTotalNumber) => sum + teamTotalNumber, 0);
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
