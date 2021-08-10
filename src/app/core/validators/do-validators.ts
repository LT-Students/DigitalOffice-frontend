import { FormControl, ValidationErrors } from '@angular/forms';

function isEmptyInputValue(value: any): boolean {
	return value == null || value.length === 0;
}

const EMAIL_REGEXP = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export class DoValidators {
	static email(control: FormControl): ValidationErrors | null {
		if (isEmptyInputValue(control.value)) {
			return null;
		}
		return EMAIL_REGEXP.test(control.value) ? null : { email: true };
	}
}
