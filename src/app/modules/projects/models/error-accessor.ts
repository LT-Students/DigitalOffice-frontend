import { AbstractControl, FormControl, FormGroup, ValidationErrors } from '@angular/forms';

export class ErrorAccessor {
	protected getControlErrors(control: AbstractControl): ValidationErrors | null {
		if (control instanceof FormControl) {
			// Return FormControl errors or null
			return control.errors ?? null;
		}
		if (control instanceof FormGroup) {
			const groupErrors = control.errors;
			// Form group can contain errors itself, in that case add'em
			const formErrors = groupErrors ? { ...groupErrors } : {};
			Object.keys(control.controls).forEach((key: string) => {
				// Recursive call of the FormGroup fields
				const error = this.getControlErrors(control.get(key) as AbstractControl);
				if (error !== null) {
					// Only add error if not null
					formErrors[key] = error;
				}
			});
			// Return FormGroup errors or null
			return Object.keys(formErrors).length > 0 ? formErrors : null;
		}
		return null;
	}
}
