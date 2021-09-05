import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { UserService } from '@app/services/user/user.service';

export interface UserInformation {
	name?: string;
	lastName?: string;
	position?: string;
	hoursProject?: number;
	norm?: number;
	absence?: string | string[];
	numberProjects?: string;
}

@Component({
	selector: 'do-team-statistics',
	templateUrl: './team-statistics.component.html',
	styleUrls: ['./team-statistics.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamStatisticsComponent implements OnInit {
	@ViewChild(MatSort) sort: MatSort | undefined;
	public startDate = new Date();
	displayedColumns = ['Имя', 'Часы за проект/Норма', 'Отсутствия', 'Кол-во проектов'];
	public DATA: UserInformation[] = [
		{ name: 'Сергей', lastName: 'Жуков', position: 'Back-End',hoursProject: 120, norm: 180, absence: 'Отпуск', numberProjects: '1 проект' } ,
		{ name: 'Алексей', lastName: 'Лосев', position: 'Back-End', hoursProject: 130, norm: 180, absence: 'Больничный', numberProjects: '1 проект' } ,
		{ name: 'Петр', lastName: 'Котов', position: 'Back-End', hoursProject: 140, norm: 180, numberProjects: '1 проект' } ,
		{ name: 'Иван', lastName: 'Собакин', position: 'Back-End', hoursProject: 120, norm: 180, absence: 'Отпуск', numberProjects: '1 проект' } ,
		{ name: 'Мария', lastName: 'Крышкина', position: 'Back-End', hoursProject: 130, norm: 180, numberProjects: '1 проект' } ,
		{ name: 'Наталья', lastName: 'Ложкина', position: 'Back-End', hoursProject: 140, norm: 180, absence: 'Больничный', numberProjects: '1 проект' } ,
		{ name: 'Кристина', lastName: 'Комарова', position: 'Back-End', hoursProject: 120, norm: 180, absence: 'Отпуск', numberProjects: '1 проект' } ,
		{ name: 'Алина', lastName: 'Сидорова', position: 'Back-End', hoursProject: 110, norm: 180, numberProjects: '1 проект' } ,
		{ name: 'Александр', lastName: 'Иванов', position: 'Back-End', hoursProject: 100, norm: 180, absence: 'Больничный', numberProjects: '1 проект' } ,
		{ name: 'Дмитрий', lastName: 'Смирнов', position: 'Back-End', hoursProject: 90, norm: 180, absence: 'Отпуск', numberProjects: '1 проект' } ,
	];
	dataSource = this.DATA;
	constructor(private _userService: UserService, private cdr: ChangeDetectorRef) {
	}

	ngOnInit(): void {
	}

	public chosenMonthHandler(chosenDate: Date) {
		this.startDate = chosenDate;
	}

	public changeMonth(changeDate: number) {
		const currentMonth = this.startDate.getMonth();
		const nextMonth = currentMonth + changeDate;
		this.startDate = new Date(this.startDate.setMonth(nextMonth));
	}


}
