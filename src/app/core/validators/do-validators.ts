import { AbstractControl, ValidationErrors } from '@angular/forms';
import { isValidPhoneNumber } from 'libphonenumber-js';

function isEmptyInputValue(value: any): boolean {
	return value == null || value.length === 0;
}

const EMAIL_REGEXP = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i;
const NUMBER_REGEXP = /^-?\d*\.?\d+$/;
const TELEGRAM_REGEXP = /^[A-Za-z]+(_?[A-Za-z0-9])*$/;
// Не уверен за этот regex, но пока пусть будет, если кто умный - подайте идею.
const SKYPE_REGEXP = /^[A-Za-z][A-Za-z0-9.,\-_]+$/;
const TWITTER_REGEXP = /^\w+$/;

export class DoValidators {
	static email(control: AbstractControl): ValidationErrors | null {
		if (isEmptyInputValue(control.value)) {
			return null;
		}
		return EMAIL_REGEXP.test(control.value) ? null : { email: true };
	}

	static telegram(control: AbstractControl): ValidationErrors | null {
		if (isEmptyInputValue(control.value)) {
			return null;
		}

		return TELEGRAM_REGEXP.test(control.value) ? null : { telegram: true };
	}

	static phone(control: AbstractControl): ValidationErrors | null {
		if (isEmptyInputValue(control.value)) {
			return null;
		}

		return isValidPhoneNumber(control.value) ? null : { phone: true };
	}

	static skype(control: AbstractControl): ValidationErrors | null {
		if (isEmptyInputValue(control.value)) {
			return null;
		}

		return SKYPE_REGEXP.test(control.value) ? null : { skype: true };
	}

	static twitter(control: AbstractControl): ValidationErrors | null {
		if (isEmptyInputValue(control.value)) {
			return null;
		}

		return TWITTER_REGEXP.test(control.value) ? null : { twitter: true };
	}

	static number(control: AbstractControl): ValidationErrors | null {
		if (isEmptyInputValue(control.value)) {
			return null;
		}

		return NUMBER_REGEXP.test(control.value) ? null : { number: true };
	}

	static noWhitespaces(control: AbstractControl): ValidationErrors | null {
		if (isEmptyInputValue(control.value)) {
			return null;
		}
		const isValid = control.value.trim().length !== 0;
		return isValid ? null : { whitespace: true };
	}

	static doName(control: AbstractControl): ValidationErrors | null {
		if (isEmptyInputValue(control.value)) {
			return null;
		}
		return /(^\s+|\s+$)/.test(control.value) ? { name: true } : null;
	}

	static atLeastOneChecked(control: AbstractControl): ValidationErrors | null {
		if (control.value.length > 0) {
			return null;
		}
		return { atLeastOneChecked: true };
	}
}
