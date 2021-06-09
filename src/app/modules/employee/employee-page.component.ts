import { Component, OnInit } from '@angular/core';
import { EducationModel, StudyType } from '@app/models/education.model';
import { UserService } from '@app/services/user.service';
import { UserResponse } from '@data/api/user-service/models/user-response';
import { Project } from '@data/models/project';
import { activeProject, closedProject, courses, institutes, skills } from './mock';

// eslint-disable-next-line no-shadow
export enum WorkFlowMode {
	EDIT = 'EDIT',
	VIEW = 'VIEW',
	ADD = 'ADD',
}

export interface Modes {
	skills: WorkFlowMode;
	education: WorkFlowMode;
	certificates: WorkFlowMode;
}

export interface UserProject extends Project {
	role: string;
	startedAt: Date;
	endedAt?: Date;
}

@Component({
	selector: 'do-employee-page',
	templateUrl: './employee-page.component.html',
	styleUrls: ['./employee-page.component.scss'],
})

export class EmployeePageComponent implements OnInit {
	public skills: string[];
	public institutes: EducationModel[];
	public courses: EducationModel[];
	public studyTypes: StudyType[];
	public userProjects: UserProject[];

	public userInfo: UserResponse;

	constructor(private userService: UserService) {
		this.skills = skills;
		this.institutes = institutes;
		this.courses = courses;
		this.studyTypes = [
			StudyType.ABSENTIA,
			StudyType.CONFRONT,
			StudyType.PARTTIME,
			StudyType.OFFLINE,
			StudyType.ONLINE,
		];
	}

	ngOnInit(): void {
		// TODO: Check if currentPage.user.id === currentUser.id во избежание лишних запросов к api
		const user = this.userService.getCurrentUser();

		this.userProjects = this._getUserProjects();
		this.userService.getUser(user.id).subscribe((userResponse: UserResponse) => {
			console.log(userResponse);
			this.userInfo = userResponse;
		});
	}


	private _getUserProjects(): UserProject[] {
		return [
			activeProject,
			{
				...activeProject,
				description:
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
			},
			...Array(5).fill(closedProject)
		];
	}

}
