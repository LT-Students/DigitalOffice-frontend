import { ComponentType } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UserSearchComponent } from './modals/user-search/user-search.component';
import { DepartmentInfo } from '@data/api/user-service/models/department-info';
import { ProjectStatus } from '@app/models/project-status';
import { ProjectStatusType } from '@data/api/project-service/models/project-status-type';
import { ProjectService } from '@app/services/project.service';
import { WorkFlowMode } from '../../../employee/employee-page.component';
import { ModalService, ModalType, UserSearchModalConfig } from '@app/services/modal.service';
import { DeleteDirectionComponent, ModalApprovalConfig } from './modals/delete-direction/delete-direction.component';
import { Team, teamCards, TeamMember } from './team-cards';


@Component({
	selector: 'do-new-project',
	templateUrl: './new-project.component.html',
	styleUrls: ['./new-project.component.scss'],
})
export class NewProjectComponent implements OnInit {
	public projectForm: FormGroup;
	public teams: Team[] = teamCards;
	// TODO: REPLACE WITH API
	public departments: DepartmentInfo[];
	public statuses: ProjectStatus[];
	public team = [
		{
			name: 'Olya',
			profileImgSrc: '',
		},
		{
			name: 'Slava',
			profileImgSrc: '',
		},
	];

	constructor(public dialog: MatDialog,
				private formBuilder: FormBuilder,
				private _projectService: ProjectService,
				private _modalService: ModalService,
	) {
		this.statuses = [
			new ProjectStatus(ProjectStatusType.Active),
			new ProjectStatus(ProjectStatusType.Closed),
			new ProjectStatus(ProjectStatusType.Suspend),
		]
		this.departments = [
			{
				id: 'cc289eba-ada8-11eb-8529-0242ac130003',
				name: 'Департамент Цифровых решений',
				startWorkingAt: '14/14/21'
			},
			{
				id: 'f3a25346-ada8-11eb-8529-0242ac130003',
				name: 'Департамент тестовых решений',
				startWorkingAt: '14/14/21'
			},
			{
				id: 'f6fd15ee-ada8-11eb-8529-0242ac130003',
				name: 'Департамент медицинских решений',
				startWorkingAt: '14/14/21'
			},
		];
		 this.teams = teamCards;
	}

	ngOnInit(): void {
		this.projectForm = this.formBuilder.group({
			name: ['', [Validators.required, Validators.maxLength(80)]],
			shortName: ['', [Validators.required, Validators.maxLength(32)]],
			departments: ['', [Validators.required, Validators.maxLength(32)]],
			description: ['', [Validators.required, Validators.maxLength(500)]],
			checkControl: ['', [Validators.required]],
			additionInfo: [''],
			department: [''],
			customer: [''],
			status: [''],
			picker: [''],
		});

		this.teams.forEach((team: Team) => this._sortLeads(team));
	}

	public addMember(): void {
		const modalData: UserSearchModalConfig = { mode: WorkFlowMode.ADD };
		this._modalService.openModal(UserSearchComponent, modalData);
	}

	public createProject(): void {}
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
		return this.teams.map((team: Team) => team.members.length)
		.reduce((sum: number, teamTotalNumber) => sum + teamTotalNumber);
	}

	private _getAllMembers(): TeamMember[] {
		return this.teams.map((team: Team) => team.members)
		.reduce((prev: TeamMember[], currentValue: TeamMember[]) => prev.concat(currentValue), []);
	}

	private _sortLeads(team: Team): void {
		const leads: TeamMember[] = team.members.filter((member: TeamMember) => member.lead);
		const ordinary: TeamMember[] = team.members.filter((member: TeamMember) => !member.lead);
		team.members = [...leads, ...ordinary]
	}
}
