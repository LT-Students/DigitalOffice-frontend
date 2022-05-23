import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { AbstractControl, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import { EmailValue } from '@shared/modals/user-recovery/email-item/email-item.component';

const emailExists: ValidatorFn = (control: AbstractControl) => {
	const errorEmail = control.getError('emailExists');
	if (control.value.email === errorEmail) {
		return { emailExists: errorEmail };
	}
	return null;
};

@Component({
	selector: 'do-email-list',
	templateUrl: './email-list.component.html',
	styleUrls: ['./email-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmailListComponent implements OnInit {
	@Input() form!: FormArray;
	@Output() selectionChange = new EventEmitter<number>();

	public isEmailAdded = false;

	constructor() {}

	ngOnInit(): void {}

	public addEmail(): void {
		this.isEmailAdded = true;
		const newEmail = new EmailValue('');
		this.form.push(new FormControl(newEmail, emailExists));
	}

	public removeEmail(): void {
		this.form.removeAt(-1);
		this.isEmailAdded = false;
	}
}
