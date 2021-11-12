import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DepartmentInfo } from '@data/api/user-service/models/department-info';
import { ProjectStatusType } from '@data/api/project-service/models/project-status-type';
import { ICreateProjectRequest, ICreateUserRequest, ProjectService } from '@app/services/project/project.service';
import { ModalService, ModalWidth, UserSearchModalConfig } from '@app/services/modal.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserInfo } from '@data/api/user-service/models/user-info';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ProjectUserRoleType } from '@data/api/project-service/models/project-user-role-type';
import { DepartmentService } from '@app/services/department/department.service';
import { WorkFlowMode } from '../../../employee/employee-page.component';
import { RouteType } from '../../../../app-routing.module';
import { UserSearchComponent } from './modals/user-search/user-search.component';
import { Team, TeamMember } from './team-cards';

@Component({
	selector: 'do-new-project',
	templateUrl: './new-project.component.html',
	styleUrls: ['./new-project.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewProjectComponent implements OnInit {
	public projectForm: FormGroup;
	public teams: Team[];
	public departments: DepartmentInfo[];
	public statuses: ProjectStatusType[];
	public membersAll: UserInfo[];
	public pluralTeamCount: { [k: string]: string };

	constructor(
		private _formBuilder: FormBuilder,
		private _projectService: ProjectService,
		private _modalService: ModalService,
		private _departmentService: DepartmentService,
		private _snackBar: MatSnackBar,
		private _location: Location,
		private _router: Router,
		private _cdr: ChangeDetectorRef
	) {
		this.pluralTeamCount = {
			few: '# человека',
			other: '# человек',
		};
		this.statuses = [ProjectStatusType.Active, ProjectStatusType.Closed, ProjectStatusType.Suspend];
		this.teams = [];
		this.membersAll = [];
		this.departments = [];

		this.projectForm = this._formBuilder.group({
			name: ['', [Validators.required, Validators.maxLength(150)]],
			departmentId: ['', [Validators.required]],
			description: [null, [Validators.maxLength(300)]],
			shortDescription: [null],
			status: [ProjectStatusType.Active],
		});
	}

	ngOnInit(): void {
		this._getDepartments();

		// this.teams.forEach((team: Team) => this._sortLeads(team));
	}

	private _getDepartments(): void {
		this._departmentService.findDepartments({ skipCount: 0, takeCount: 100 }).subscribe(
			(data) => {
				this.departments = data.body ?? [];
			},
			(error) => console.log(error)
		);
	}

	public addMember(): void {
		//TODO replace with infinite scroll modal
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

	public createProject(): void {
		const projectUsers: ICreateUserRequest[] = this.membersAll.map((user) => ({
			role: ProjectUserRoleType.Manager,
			userId: user.id ?? '',
		}));
		const projectRequest: ICreateProjectRequest = {
			name: this.projectForm.get('name')?.value?.trim(),
			departmentId: this.projectForm.get('departmentId')?.value,
			description: this.projectForm.get('description')?.value?.trim(),
			shortDescription: this.projectForm.get('shortDescription')?.value?.trim(),
			status: this.projectForm.get('status')?.value,
			users: projectUsers,
			projectImages: [],
		};
		this._projectService.createProject(projectRequest).subscribe(
			(result) => {
				this._snackBar.open('Project successfully created', 'Закрыть', { duration: 3000 });
				this._router.navigate([`${RouteType.PROJECT}/${result.body}`]);
			},
			(error) => {
				let errorMessage = error.error.errors;
				if (error.status === 409) {
					errorMessage = 'Проект с таким названием уже существует';
				}
				this._snackBar.open(errorMessage, 'accept');
				throw error;
			}
		);
	}

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
}
