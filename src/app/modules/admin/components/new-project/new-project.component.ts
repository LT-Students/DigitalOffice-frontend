import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DepartmentInfo } from '@data/api/user-service/models/department-info';
import { ProjectStatusType } from '@data/api/project-service/models/project-status-type';
import { ICreateProjectRequest, ICreateUserRequest, ProjectService } from '@app/services/project/project.service';
import { ModalService, ModalWidth, UserSearchModalConfig } from '@app/services/modal.service';
import { UserInfo } from '@data/api/user-service/models/user-info';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectUserRoleType } from '@data/api/project-service/models/project-user-role-type';
import { DepartmentService } from '@app/services/department/department.service';
import { IProjectStatusType, ProjectTypeModel } from '@app/models/project/project-status';
import { map, switchMap, tap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DepartmentUserInfo } from '@data/api/department-service/models/department-user-info';
import { WorkFlowMode } from '../../../employee/employee-page.component';
import { RouteType } from '../../../../app-routing.module';
import {
	AddEmployeeComponent,
	OpenAddEmployeeModalFrom,
} from '../../../../shared/modals/add-employee/add-employee.component';
import { UserSearchComponent } from './modals/user-search/user-search.component';
import { Team, TeamMember } from './team-cards';

@Component({
	selector: 'do-new-project',
	templateUrl: './new-project.component.html',
	styleUrls: ['./new-project.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewProjectComponent implements OnInit {
	public totalCount: number;
	public departmentInfo: DepartmentInfo | undefined;
	public projectForm: FormGroup;
	public teams: Team[];
	public departments: DepartmentInfo[];
	public statuses: IProjectStatusType[];
	public membersAll: UserInfo[];
	public pluralTeamCount: { [k: string]: string };
	private _departmentId: string;
	public dataSource: MatTableDataSource<DepartmentUserInfo>;

	constructor(
		private _formBuilder: FormBuilder,
		private _projectService: ProjectService,
		private _modalService: ModalService,
		private _departmentService: DepartmentService,
		private _location: Location,
		private _router: Router,
		private _route: ActivatedRoute,
		private _cdr: ChangeDetectorRef,
		private _dialog: MatDialog
	) {
		this.totalCount = 0;
		this._departmentId = this._route.snapshot.params.id;
		this.pluralTeamCount = {
			few: '# человека',
			other: '# человек',
		};
		this.statuses = ProjectTypeModel.getAllProjectTypes();
		this.teams = [];
		this.membersAll = [];
		this.departments = [];
		this.dataSource = new MatTableDataSource();
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

	public openAddEmployeeModal(): void {
		const dialogRef = this._dialog.open(AddEmployeeComponent, {
			data: {
				idToHide: this.membersAll.map((e) => e.id),
				openFrom: OpenAddEmployeeModalFrom.Project,
			},
			maxWidth: '670px',
		});

		dialogRef.afterClosed().subscribe((result?: UserInfo[]) => {
			if (result?.length) {
				this.membersAll.push(...result);
				this._cdr.markForCheck();
			}
		});
	}

	private _getDepartments(): void {
		this._departmentService.findDepartments({ skipCount: 0, takeCount: 100 }).subscribe(
			(data) => {
				this.departments = data.body ?? [];
			},
			(error) => console.log(error)
		);
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
				this._router.navigate([`${RouteType.PROJECT}/${result.body}`]);
			},
			(error) => {
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
