import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	OnDestroy,
	OnInit,
	Optional,
	Self,
} from '@angular/core';
import { ControlValueAccessor, FormBuilder, NgControl, ValidationErrors } from '@angular/forms';
import { Subscription } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { DoValidators } from '@app/validators/do-validators';
import { booleanGuard } from '@app/utils/utils';
import { WikiStateService } from '../../services';

@Component({
	selector: 'do-article-path',
	templateUrl: './article-path.component.html',
	styleUrls: ['./article-path.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticlePathComponent implements OnInit, OnDestroy, ControlValueAccessor {
	public form = this.fb.group({
		rubricId: this.fb.control<string | null>(null, [DoValidators.required]),
		subRubricId: this.fb.control<string | null>(null),
	});

	public rubrics$ = this.wikiState.rootRubrics$;
	public subRubrics$ = this.form.controls.rubricId.valueChanges.pipe(
		filter(booleanGuard),
		switchMap((rubricId: string) => this.wikiState.getSubRubricsByParentId$(rubricId))
	);

	private subscription?: Subscription;

	constructor(
		@Optional() @Self() private ngControl: NgControl,
		private fb: FormBuilder,
		private cdr: ChangeDetectorRef,
		private wikiState: WikiStateService
	) {
		if (ngControl) {
			ngControl.valueAccessor = this;
		}
	}

	public ngOnInit(): void {
		const control = this.ngControl.control;
		if (control) {
			control.setValidators([this.validate.bind(this)]);
			control.updateValueAndValidity();

			control.markAsTouched = () => {
				this.form.markAllAsTouched();
				this.cdr.markForCheck();
			};
		}
	}

	public ngOnDestroy(): void {
		this.subscription?.unsubscribe();
	}

	private validate(): ValidationErrors | null {
		const isInvalid = this.form.invalid;
		return isInvalid ? { invalidRubric: true } : null;
	}

	public registerOnChange(fn: any): void {
		this.subscription = this.form.valueChanges.subscribe((value) => fn(value.subRubricId || value.rubricId));
	}

	public registerOnTouched(fn: any): void {}

	public writeValue(obj: any): void {}
}
