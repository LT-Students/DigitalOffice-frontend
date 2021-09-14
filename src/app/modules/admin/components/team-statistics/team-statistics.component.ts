import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { UserService } from '@app/services/user/user.service';

export interface UserInformation {
	name?: string;
	lastName?: string;
	position?: string;
	projectHours?: number;
	norm?: number;
	absence?: string | string[];
	projectsCount?: string;
}

@Component({
	selector: 'do-team-statistics',
	templateUrl: './team-statistics.component.html',
	styleUrls: ['./team-statistics.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamStatisticsComponent implements OnInit {
	public selectedDate: Date;
	public displayedColumns: string[];
	public DATA: UserInformation[];

	constructor() {
	this.selectedDate = new Date();
	this.displayedColumns = ['Имя', 'Часы за проект/Норма', 'Отсутствия', 'Кол-во проектов'];
	this.DATA = [
			{ name: 'Сергей', lastName: 'Жуков', position: 'Back-End',projectHours: 120, norm: 180, absence: 'Отпуск', projectsCount: '1 проект' } ,
			{ name: 'Алексей', lastName: 'Лосев', position: 'Back-End', projectHours: 130, norm: 180, absence: 'Больничный', projectsCount: '1 проект' } ,
			{ name: 'Петр', lastName: 'Котов', position: 'Back-End', projectHours: 140, norm: 180, projectsCount: '1 проект' } ,
			{ name: 'Иван', lastName: 'Собакин', position: 'Back-End', projectHours: 120, norm: 180, absence: 'Отпуск', projectsCount: '1 проект' } ,
			{ name: 'Мария', lastName: 'Крышкина', position: 'Back-End', projectHours: 130, norm: 180, projectsCount: '1 проект' } ,
			{ name: 'Наталья', lastName: 'Ложкина', position: 'Back-End', projectHours: 140, norm: 180, absence: 'Больничный', projectsCount: '1 проект' } ,
			{ name: 'Кристина', lastName: 'Комарова', position: 'Back-End', projectHours: 120, norm: 180, absence: 'Отпуск', projectsCount: '1 проект' } ,
			{ name: 'Алина', lastName: 'Сидорова', position: 'Back-End', projectHours: 110, norm: 180, projectsCount: '1 проект' } ,
			{ name: 'Александр', lastName: 'Иванов', position: 'Back-End', projectHours: 100, norm: 180, absence: 'Больничный', projectsCount: '1 проект' } ,
			{ name: 'Дмитрий', lastName: 'Смирнов', position: 'Back-End', projectHours: 90, norm: 180, absence: 'Отпуск', projectsCount: '1 проект' } ,
		];
	}

	ngOnInit(): void {
	}

	public chosenMonthHandler(chosenDate: Date): void {
		this.selectedDate = chosenDate;
	}
}
