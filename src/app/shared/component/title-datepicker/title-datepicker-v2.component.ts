import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { TitleDatepickerComponent } from '@shared/component/title-datepicker/title-datepicker.component';
import { DateTime } from 'luxon';

@Component({
	selector: 'do-title-datepicker-v2',
	template: `
		<div class="flex flex_ai_center">
			<ng-content></ng-content>
			<span
				(click)="picker.open()"
				[ngClass]="dateClass"
				[ngStyle]="dateStyle"
				class="month-picker no-margin text-accent_controls_default"
				[attr.data-test]="'title-datepicker-' + id"
			>
				{{ selectDate | dateTime: (isCurrentYear ? 'LLLL' : 'LLLL y') }}
				<mat-icon class="text-light_4" [svgIcon]="Icons.ArrowDownV1"></mat-icon>
			</span>
		</div>
		<mat-form-field class="hidden-field">
			<input matInput [min]="minDate" [max]="maxDate" [matDatepicker]="$any(picker)" [(ngModel)]="selectDate" />
			<mat-datepicker
				#picker
				startView="year"
				(monthSelected)="chosenMonthHandler($event, picker)"
			></mat-datepicker>
		</mat-form-field>
	`,
	styleUrls: ['./title-datepicker.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TitleDatepickerV2Component extends TitleDatepickerComponent implements OnInit {
	@Input() dateClass = 'mat-h4';
	@Input() dateStyle: { [key: string]: string | number } | null = null;

	public get isCurrentYear(): boolean {
		return this.selectDate?.year === DateTime.now().year;
	}

	constructor() {
		super();
	}

	ngOnInit(): void {}
}
