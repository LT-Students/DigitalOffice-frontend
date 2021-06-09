import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective } from '@angular/forms';

@Component({
	selector: 'do-select',
	templateUrl: './select.component.html',
	styleUrls: ['./select.component.scss'],
})
export class SelectComponent implements OnInit {
	@Input() label = '';
	@Input() required = false;
	@Input() controlName = '';
	@Input() isEdit = true;
	@Input() placeholder = '';
	@Input() options: string[];
	@Input() textSize: 'regular' | 'small';

	control: FormControl | undefined;

	constructor(private formGroupDir: FormGroupDirective) {
		this.textSize = 'regular';
	}

	ngOnInit() {
		this.control = this.formGroupDir.control?.get(this.controlName) as FormControl;
	}
}
