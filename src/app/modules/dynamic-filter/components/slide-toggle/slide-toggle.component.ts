import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Filter } from '../../models';

interface ISlideToggleParams {
	placeholder: string;
}

export class SlideToggleParams implements ISlideToggleParams {
	public placeholder: string;

	constructor(params: ISlideToggleParams) {
		this.placeholder = params.placeholder;
	}
}

@Component({
	selector: 'do-button-toggle',
	template: `<mat-slide-toggle color="primary" [formControl]="control">{{ params.placeholder }}</mat-slide-toggle>`,
	styles: [
		`
			:host {
				height: 100%;
				display: flex;
				align-items: center;
			}

			.wrapper {
				cursor: pointer;
			}

			.button {
				pointer-events: none;
			}
		`,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SlideToggleComponent implements OnInit, OnDestroy, Filter<SlideToggleParams> {
	public params!: SlideToggleParams;
	public control = new FormControl(false);
	private subscription?: Subscription;

	constructor() {}

	ngOnInit(): void {}

	public ngOnDestroy(): void {
		this.subscription?.unsubscribe();
	}

	public toggle(): void {
		const newValue = !this.control.value;
		this.control.setValue(newValue);
	}

	public registerOnChange(fn: any): void {
		this.subscription = this.control.valueChanges.subscribe({ next: fn });
	}

	public registerOnTouched(fn: any): void {}

	public writeValue(isToggled: boolean): void {
		this.control.setValue(isToggled, { emitEvent: false });
	}
}
