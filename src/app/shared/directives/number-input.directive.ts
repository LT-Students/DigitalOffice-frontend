import { Directive, OnDestroy, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Directive({
	selector: '[doNumberInput]',
})
export class NumberInputDirective implements OnInit, OnDestroy {
	private subscription?: Subscription;
	constructor(private ngControl: NgControl) {}

	public ngOnInit(): void {
		this.subscription = this.ngControl.control?.valueChanges.subscribe((value: string) => {
			const newValue = value.replace(/[^0-9]/g, '');
			this.ngControl.control?.setValue(newValue, { emitEvent: false });
		});
	}

	public ngOnDestroy(): void {
		this.subscription?.unsubscribe();
	}
}
