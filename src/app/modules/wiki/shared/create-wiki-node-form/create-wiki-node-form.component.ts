import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	Input,
	OnDestroy,
	OnInit,
	Optional,
	Self,
} from '@angular/core';
import { ControlValueAccessor, FormBuilder, NgControl, ValidationErrors } from '@angular/forms';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { Subject } from 'rxjs';
import { filter, map, startWith, switchMap, takeUntil } from 'rxjs/operators';
import { booleanGuard } from '@app/utils/utils';
import { DoValidators } from '@app/validators/do-validators';
import { WikiNodeType, WikiNodeTypes, WikiTreeFlatNode } from '../../models';
import { WikiStateService } from '../../services';

export interface CreateNodeFormValue {
	nodeType: WikiNodeType | null;
	rubricId: string | null;
	subRubricId: string | null;
	name: string;
}

@Component({
	selector: 'do-create-wiki-node-form',
	templateUrl: './create-wiki-node-form.component.html',
	styleUrls: ['./create-wiki-node-form.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateWikiNodeFormComponent implements OnInit, OnDestroy, ControlValueAccessor {
	public readonly WikiNodeType = WikiNodeType;

	@Input()
	set disableNodeTypeSelection(disableNodeTypeSelection: BooleanInput) {
		const shouldDisable = coerceBooleanProperty(disableNodeTypeSelection);
		if (shouldDisable) {
			this.form.controls.nodeType.disable();
		}
	}

	public form = this.fb.group({
		nodeType: this.fb.control<WikiNodeType | null>(null, [DoValidators.required]),
		rubricId: this.fb.control<string | null>(null, [DoValidators.required]),
		subRubricId: this.fb.control<string | null>(null),
		name: ['', [DoValidators.required, DoValidators.matchMaxLength(100)]],
	});

	public nodeTypes$ = this.wikiState.rootRubrics$.pipe(map(this.getNodeTypes.bind(this)));

	public rubrics$ = this.wikiState.rootRubrics$;
	public subRubrics$ = this.form.controls.rubricId.valueChanges.pipe(
		startWith(null),
		map(() => this.form.controls.rubricId.value),
		filter(booleanGuard),
		switchMap((rubricId: string) => this.wikiState.getSubRubricsByParentId$(rubricId))
	);

	private destroy$ = new Subject();

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

		this.form.valueChanges.pipe(startWith(null), takeUntil(this.destroy$)).subscribe(() => {
			const { nodeType } = this.form.getRawValue();
			switch (nodeType) {
				case WikiNodeType.Rubric:
					this.form.controls.rubricId.disable({ emitEvent: false });
					this.form.controls.subRubricId.disable({ emitEvent: false });
					this.form.controls.name.enable({ emitEvent: false });
					break;
				case WikiNodeType.SubRubric:
					this.form.controls.rubricId.enable({ emitEvent: false });
					this.form.controls.subRubricId.disable({ emitEvent: false });
					this.form.controls.name.enable({ emitEvent: false });
					break;
				case WikiNodeType.Article:
					this.form.controls.rubricId.enable({ emitEvent: false });
					this.form.controls.subRubricId.enable({ emitEvent: false });
					this.form.controls.name.disable({ emitEvent: false });
					break;
				default:
					this.form.controls.rubricId.disable({ emitEvent: false });
					this.form.controls.subRubricId.disable({ emitEvent: false });
					this.form.controls.name.disable({ emitEvent: false });
					break;
			}
			this.form.updateValueAndValidity({ emitEvent: false });
		});
	}

	public ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}

	private validate(): ValidationErrors | null {
		const isInvalid = this.form.invalid;
		return isInvalid ? { invalidRubric: true } : null;
	}

	public registerOnChange(fn: any): void {
		this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((value) => fn(value));
	}

	public registerOnTouched(fn: any): void {}

	public writeValue(value: CreateNodeFormValue | null): void {
		setTimeout(() => {
			if (value) {
				this.form.patchValue(value);
			}
		});
	}

	private getNodeTypes(rubrics: WikiTreeFlatNode[]): { label: string; value: WikiNodeType }[] {
		if (rubrics.length) {
			return WikiNodeTypes.getTypes();
		}
		return WikiNodeTypes.getTypes().filter((type) => type.value === WikiNodeType.Rubric);
	}
}
