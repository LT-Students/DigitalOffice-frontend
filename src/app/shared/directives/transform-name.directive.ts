import { Directive, OnDestroy, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Directive({
	selector: '[doTransformName]',
})
export class TransformNameDirective implements OnInit, OnDestroy {
	public subscription?: Subscription;

	constructor(private ngControl: NgControl) {}

	public ngOnInit() {
		this.subscription = this.ngControl.control?.valueChanges.subscribe((value: string) => {
			const newValue = this.transform(value);
			this.ngControl.control?.setValue(newValue, { emitEvent: false });
		});
	}

	private transform(value: string): string {
		const text = value.toLowerCase().replace(/(?:^|[\s\-'])\p{L}/gu, (match: string) => match.toUpperCase());
		return text.replace(/\s*([-'])\s*/g, '$1');
	}

	public ngOnDestroy() {
		this.subscription?.unsubscribe();
	}
}
