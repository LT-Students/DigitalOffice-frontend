//@ts-nocheck
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '@app/services/project/project.service';
import { ProjectInfo } from '@data/api/project-service/models/project-info';
import { ProjectUserInfo } from '@data/api/project-service/models/project-user-info';

@Component({
	selector: 'do-project-page',
	templateUrl: './project-page.component.html',
	styleUrls: ['./project-page.component.scss'],
changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectPageComponent implements OnInit {
	public projectId: string;
	public projectInfo: ProjectInfo;
	public projectUsers: Array<ProjectUserInfo>;
	public projectCreatedAt: Date;
	public projectDuration: number;

	constructor(private _route: ActivatedRoute, private _projectService: ProjectService) {}

	// projectPage = {
	// 	id: '1',
	// 	name: 'Меркурий',
	// 	description: 'Департамент цифровых решений',
	//
	// 	details: {
	// 		consumer: 'Роскосмос',
	// 		status: 'В работе ',
	// 		start: '20 октября 2019',
	// 		duration: '233 дня',
	// 		team: '19 участников',
	// 	},
	//
	// 	teamProgress: {
	// 		allTime: '2858',
	// 		lastTime: '264',
	// 		lastMonth: 'Июнь 2020',
	// 	},
	//
	// 	members: [
	// 		{
	// 			id: '88',
	// 			firstName: 'Eva',
	// 			lastName: 'Tener',
	// 			smallPhoto: 'assets/images/smallPhoto/Ellipse88.png',
	// 			role: 'Product Manager',
	// 			progress: { allTime: '295', lastTime: '40', lastMonth: 'Июнь 2020' },
	// 		},
	//
	// 		{
	// 			id: '89',
	// 			firstName: 'Jerry',
	// 			lastName: 'Fenster',
	// 			smallPhoto: 'assets/images/smallPhoto/Ellipse89.png',
	// 			role: 'TeamLead',
	// 			progress: { allTime: '295', lastTime: '40', lastMonth: 'Июнь 2020' },
	// 		},
	//
	// 		{
	// 			id: '90',
	// 			firstName: '',
	// 			lastName: '',
	// 			smallPhoto: 'assets/images/smallPhoto/Ellipse90.png',
	// 			role: '',
	// 			progress: { allTime: '295', lastTime: '40', lastMonth: 'Июнь 2020' },
	// 		},
	//
	// 		{
	// 			id: '91',
	// 			firstName: '',
	// 			lastName: '',
	// 			smallPhoto: 'assets/images/smallPhoto/Ellipse91.png',
	// 			role: '',
	// 			progress: { allTime: '295', lastTime: '40', lastMonth: 'Июнь 2020' },
	// 		},
	//
	// 		{
	// 			id: '92',
	// 			firstName: '',
	// 			lastName: '',
	// 			smallPhoto: 'assets/images/smallPhoto/Ellipse92.png',
	// 			role: '',
	// 			progress: { allTime: '295', lastTime: '40', lastMonth: 'Июнь 2020' },
	// 		},
	//
	// 		{
	// 			id: '93',
	// 			firstName: '',
	// 			lastName: '',
	// 			smallPhoto: 'assets/images/smallPhoto/Ellipse93.png',
	// 			role: '',
	// 			progress: { allTime: '295', lastTime: '40', lastMonth: 'Июнь 2020' },
	// 		},
	//
	// 		{
	// 			id: '94',
	// 			firstName: '',
	// 			lastName: '',
	// 			smallPhoto: 'assets/images/smallPhoto/Ellipse94.png',
	// 			role: '',
	// 			progress: { allTime: '295', lastTime: '40', lastMonth: 'Июнь 2020' },
	// 		},
	//
	// 		{
	// 			id: '95',
	// 			firstName: '',
	// 			lastName: '',
	// 			smallPhoto: 'assets/images/smallPhoto/Ellipse95.png',
	// 			role: '',
	// 			progress: { allTime: '295', lastTime: '40', lastMonth: 'Июнь 2020' },
	// 		},
	//
	// 		{
	// 			id: '96',
	// 			firstName: '',
	// 			lastName: '',
	// 			smallPhoto: 'assets/images/smallPhoto/Ellipse96.png',
	// 			role: '',
	// 			progress: { allTime: '295', lastTime: '40', lastMonth: 'Июнь 2020' },
	// 		},
	// 	],
	// };

	// valuesFromDescription = Object.values(this.projectPage.details);
	ngOnInit(): void {
		this.projectId = this._route.snapshot.params.id;
		this._projectService.getProject({ projectId: this.projectId, includeusers: true }).subscribe((result) => {
			this.projectInfo = result.project;
			this.projectUsers = result.users;
			this.projectCreatedAt = new Date(this.projectInfo.createdAt);
			this.projectDuration = this._countProjectDuration();
		});
	}

	private _countProjectDuration(): number {
		const currentTime = new Date();
		const dayLength = 24 * 60 * 60 * 1000;

		return Math.round(Math.abs((currentTime.getTime() - this.projectCreatedAt.getTime()) / dayLength));
	}
}
