import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

export interface HintValidation {
	label: string;
	valid?: boolean;
}

//This component should be used inside mde-popover.
@Component({
	selector: 'do-validation-hint',
	templateUrl: './validation-hint.component.html',
	styleUrls: ['./validation-hint.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ValidationHintComponent implements OnInit {
	@Input()
	set validations(validations: HintValidation[] | null) {
		this._validations = validations || [];
	}
	get validations(): HintValidation[] {
		return this._validations;
	}
	private _validations: HintValidation[] = [];

	constructor() {}

	ngOnInit(): void {}
}
