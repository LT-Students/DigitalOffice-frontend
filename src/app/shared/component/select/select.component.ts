//@ts-nocheck
import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroupDirective } from '@angular/forms';

@Component({
	selector: 'do-select',
	templateUrl: './select.component.html',
	styleUrls: ['./select.component.scss'],
changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent implements OnInit {
	@Input() label = '';
	@Input() required = false;
	@Input() controlName = '';
	@Input() isEdit = true;
	@Input() placeholder = '';
	@Input() options: string[];
	@Input() textSize: 'regular' | 'small';

	control: FormControl;

	constructor(private formGroupDir: FormGroupDirective) {
		this.textSize = 'regular';
	}

	ngOnInit() {
		this.control = this.formGroupDir.control?.get(this.controlName) as FormControl;
	}
}
