import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'do-wizard',
	templateUrl: './wizard.component.html',
	styleUrls: ['./wizard.component.scss'],
})
export class WizardComponent implements OnInit {
	firstFormGroup: FormGroup;
	secondFormGroup: FormGroup;
	isEditable = false;

	constructor(private _formBuilder: FormBuilder) {}

	ngOnInit() {
		this.firstFormGroup = this._formBuilder.group({
			firstCtrl: ['', Validators.required],
		});
		this.secondFormGroup = this._formBuilder.group({
			secondCtrl: ['', Validators.required],
		});
	}
}
