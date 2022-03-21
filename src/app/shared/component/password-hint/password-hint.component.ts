import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

interface PasswordValidation {
	minLength: boolean;
	maxLength: boolean;
	upperCase: boolean;
	lowerCase: boolean;
	hasDigit: boolean;
	hasSpecialChar: boolean;
	hasSpace: boolean;
}

@Component({
	selector: 'do-password-hint',
	templateUrl: './password-hint.component.html',
	styleUrls: ['./password-hint.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordHintComponent implements OnInit {
	@Input() control?: AbstractControl;

	public validation$?: Observable<PasswordValidation>;

	constructor() {}

	ngOnInit(): void {
		this.validation$ = this.control?.valueChanges.pipe(
			startWith(''),
			map((value: string) => ({
				hasDigit: /[0-9]/.test(value),
				hasSpace: /\s/.test(value),
				hasSpecialChar: /[.,:;?!*+%\-<>@\[\]{}/\\_$#]/.test(value),
				minLength: value.length >= 8,
				maxLength: value.length <= 14,
				lowerCase: /[a-z]/u.test(value),
				upperCase: /[A-Z]/u.test(value),
			}))
		);
	}
}
