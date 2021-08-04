import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Time } from '@angular/common';
import { takeUntil } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';

import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

import { AttendanceService } from '@app/services/attendance.service';
import { ProjectStore } from '@data/store/project.store';
import { Project, } from '@app/models/project/project.model';
import { ITask, Task } from '@app/models/task.model';
import { UserInfo } from '@data/api/user-service/models/user-info';
import { timeValidator } from './add-hours.validators';

@Component({
	selector: 'do-add-hours',
	templateUrl: './add-hours.component.html',
	styleUrls: ['./add-hours.component.scss'],
})
export class AddHoursComponent implements OnInit, OnDestroy {
	@Input() user: UserInfo;
	private onDestroy$: ReplaySubject<any> = new ReplaySubject<any>(1);

	public projects: Project[];
	public addHoursForm: FormGroup;
	public setTimePeriod: Time;

	public categories;
	public chosenCategory;

	public listOfIcons = [
		{ name: 'more', url: 'assets/svg/more.svg' },
		{ name: 'hint', url: 'assets/svg/hint.svg' },
		{ name: 'attach-file', url: 'assets/svg/attach-file.svg' },
	];

	constructor(
		private fb: FormBuilder,
		private attendanceService: AttendanceService,
		private projectStore: ProjectStore,
		iconRegistry: MatIconRegistry,
		sanitizer: DomSanitizer
	) {
		this.projects = [];
		this.listOfIcons.forEach((icon) => {
			iconRegistry.addSvgIcon(icon.name, sanitizer.bypassSecurityTrustResourceUrl(icon.url));
		});
	}

	ngOnInit() {
		this.addHoursForm = this.fb.group({
			// time: this.fb.group({
			// 	hours: ['', [Validators.required, timeValidator(() => this.getHours())]],
			// 	minutes: ['', [Validators.required, Validators.max(59)]],
			// }),
			time: [2400],
			project: ['', Validators.required],
			task: ['', Validators.required],
			description: [''],
		});

		// this.attendanceService.recommendedTime$.pipe(takeUntil(this.onDestroy$)).subscribe((timePeriod) => {
		// 	this.setTimePeriod = timePeriod;
		// 	this.addHoursForm.get('time.hours').setValue(this.attendanceService.normalizeTime(timePeriod.hours));
		// 	this.addHoursForm.get('time.minutes').setValue(this.attendanceService.normalizeTime(timePeriod.minutes));
		// });

		this.categories = [
			{ name: 'Проект', options: this.projects },
			{
				name: 'Командировка',
				options: [
					{ id: 0, name: 'За счёт компании' },
					{ id: 1, name: 'За счёт компании-партнёра' },
				],
			},
			{
				name: 'Обучение',
				options: [
					{ id: 0, name: 'За свой счёт' },
					{ id: 1, name: 'За счёт компании' },
				],
			},
			{
				name: 'Больничный',
				options: [
					{ id: 0, name: 'Обычный' },
					{ id: 1, name: 'Дети/родственники' },
					{ id: 2, name: 'По беременности и родам' },
				],
			},
			{
				name: 'Отпуск',
				options: [
					{ id: 0, name: 'Ежегодный' },
					{ id: 1, name: 'За свой счёт' },
					{ id: 2, name: 'Декретный' },
				],
			},
			{
				name: 'Отгул',
				options: [
					{ id: 0, name: 'Суд' },
					{ id: 1, name: 'ДТП' },
					{ id: 2, name: 'Форс-мажор' },
					{ id: 3, name: 'Похороны' },
				],
			},
		];
		this.chosenCategory = this.categories[0];
	}

	get options() {
		return this.chosenCategory.options;
	}

	private getHours(): number {
		const currentDatePeriod = this.attendanceService.datePeriod;
		return Number(this.attendanceService.getRecommendedTime(currentDatePeriod, 24).hours);
	}

	public onSubmit(): void {
		const projectId = this.addHoursForm.get('project').value;
		console.log(this.addHoursForm);
		const task: Partial<ITask> = {
			title: this.addHoursForm.get('task').value,
			description: this.addHoursForm.get('description').value,
			createdAt: new Date(),
			minutes: Number(this.addHoursForm.get('time.minutes').value) + Number(this.addHoursForm.get('time.hours').value) * 60,
		};
		this.projectStore.addTaskToProject(task, projectId);
		this.addHoursForm.reset();
		const datePeriod = this.attendanceService.datePeriod;
		this.attendanceService.onDatePeriodChange(datePeriod);
	}

	public getTimePeriodErrorMessage(): String {
		const hours = this.addHoursForm.get('time.hours');
		const minutes = this.addHoursForm.get('time.minutes');

		if (hours.hasError('periodExceedsMaxValue')) {
			return 'Превышено максимальное время для выбранного периода';
		}
		if (minutes.hasError('max')) {
			return 'Введите корректные минуты';
		}
		return 'Введите корретный период времени';
	}

	ngOnDestroy() {
		this.onDestroy$.next(null);
		this.onDestroy$.complete();
	}

	public doTime() {
		const time = this.addHoursForm.get('time');
		console.log(this.addHoursForm.value, time.invalid);
	}
}
