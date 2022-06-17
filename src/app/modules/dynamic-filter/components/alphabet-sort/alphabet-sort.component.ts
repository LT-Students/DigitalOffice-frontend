import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { Icons } from '@shared/features/icons/icons';
import { ButtonToggleChange, ButtonToggleComponent } from '@shared/component/button-toggle/button-toggle.component';
import { Filter } from '../../models/filter';

@Component({
	selector: 'do-alphabet-sort',
	template: `
		<do-button-toggle class="button" #asc [value]="true" (toggleChange)="handleToggle($event, desc)">
			<mat-icon class="icon" [svgIcon]="Icons.AlphabetSortAsc"></mat-icon>
		</do-button-toggle>
		<do-button-toggle class="button" #desc [value]="false" (toggleChange)="handleToggle($event, asc)">
			<mat-icon class="icon" [svgIcon]="Icons.AlphabetSortDesc"></mat-icon>
		</do-button-toggle>
	`,
	styleUrls: ['./alphabet-sort.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlphabetSortComponent implements OnInit, OnDestroy, Filter<any> {
	public Icons = Icons;
	public control = new Subject<boolean | undefined>();
	private subscription!: Subscription;

	private onChange = () => {};
	private onTouched = () => {};

	constructor() {}

	public ngOnInit(): void {
		this.subscription = this.control.subscribe({ next: this.onChange });
	}

	public ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	public handleToggle(event: ButtonToggleChange, toggle: ButtonToggleComponent): void {
		if (!event.checked && !toggle.checked) {
			this.control.next();
			return;
		}
		toggle.checked = false;
		this.control.next(event.value);
	}

	public registerOnChange(fn: any): void {
		this.onChange = fn;
	}

	public registerOnTouched(fn: any): void {
		this.onTouched = fn;
	}

	public writeValue(value: any): void {}
}
