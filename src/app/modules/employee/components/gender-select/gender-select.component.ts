import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, Optional, Self } from '@angular/core';
import { GenderApiService } from '@api/user-service/services/gender-api.service';
import { debounceTime, map, startWith, switchMap, takeUntil, tap } from 'rxjs/operators';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { GenderInfo } from '@api/user-service/models/gender-info';
import { Subject } from 'rxjs';

@Component({
	selector: 'do-gender-select',
	template: `
		<do-form-row label="Гендер">
			<mat-form-field>
				<input matInput placeholder="Гендер" [formControl]="searchControl" [matAutocomplete]="gender" />
				<mat-autocomplete
					#gender="matAutocomplete"
					(optionSelected)="handleOptionSelection($event.option.value)"
				>
					<mat-option *ngFor="let gender of genders$ | async" [value]="gender">{{ gender.name }}</mat-option>
				</mat-autocomplete>
			</mat-form-field>
		</do-form-row>
	`,
	styles: [],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GenderSelectComponent implements OnInit, OnDestroy, ControlValueAccessor {
	public valueControl = new FormControl(null);
	public searchControl = new FormControl(null);

	public genders$ = this.searchControl.valueChanges.pipe(
		debounceTime(500),
		startWith(''),
		switchMap((str: string) => {
			return this.genderApi.findGender({ skipCount: 0, takeCount: 10 /* includeNameSubstring: str */ }).pipe(
				map((res) => res.body as GenderInfo[]),
				tap((genders: GenderInfo[]) => this.setValue(str, genders))
			);
		})
	);

	private destroy$ = new Subject();

	constructor(@Optional() @Self() ngControl: NgControl, private genderApi: GenderApiService) {
		if (ngControl) {
			ngControl.valueAccessor = this;
		}
	}

	public ngOnInit(): void {}

	public ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}

	public setValue(name: string, options: GenderInfo[]): void {
		const gender = options.find((g: GenderInfo) => g.name === name);
		this.valueControl.setValue(gender || { id: null, name });
	}

	public handleOptionSelection(option: GenderInfo): void {
		this.valueControl.setValue(option);
	}

	public registerOnChange(fn: any): void {
		this.valueControl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe({ next: fn });
	}

	public registerOnTouched(fn: any): void {}

	public writeValue(obj: any): void {
		this.valueControl.setValue(obj, { emitEvent: false });
		this.searchControl.setValue(obj, { emitEvent: false });
	}
}
