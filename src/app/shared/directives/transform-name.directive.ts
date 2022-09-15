import { Directive, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Directive({
	selector: '[doTransformName]',
})
export class TransformNameDirective implements OnInit, OnDestroy {
	private inputElement: HTMLInputElement;
	private subscription?: Subscription;

	constructor(private ngControl: NgControl, elementRef: ElementRef) {
		this.inputElement = elementRef.nativeElement;
	}

	public ngOnInit(): void {
		this.subscription = this.ngControl.control?.valueChanges.subscribe((value: string) => {
			const { selectionStart } = this.inputElement;
			const newValue = this.transform(value);
			this.ngControl.control?.setValue(newValue, { emitEvent: false });
			this.inputElement.setSelectionRange(selectionStart, selectionStart);
		});
	}

	private transform(value: string): string {
		const text = value.toLowerCase().replace(/(?:^|[\s\-'])\p{L}/gu, (match: string) => match.toUpperCase());
		return text.replace(/\s*([-'])\s*/g, '$1');
	}

	public ngOnDestroy(): void {
		this.subscription?.unsubscribe();
	}
}
