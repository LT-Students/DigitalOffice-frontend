import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { map } from 'rxjs/operators';

export class DirtyFormChecker {
	public isDirty$: Observable<boolean>;
	constructor(form: FormGroup, initialValue: any, comparator: (val1: any, val2: any) => boolean) {
		this.isDirty$ = form.valueChanges.pipe(map((value: any) => comparator(value, initialValue)));
	}
}
