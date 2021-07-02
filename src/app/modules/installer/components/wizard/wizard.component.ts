import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'do-wizard',
	templateUrl: './wizard.component.html',
	styleUrls: ['./wizard.component.scss'],
})
export class WizardComponent implements OnInit {
	companyForm: FormGroup;
	adminForm: FormGroup;
	smtpForm: FormGroup;

	constructor(private _formBuilder: FormBuilder) {}

	ngOnInit() {
		this.companyForm = this._formBuilder.group({
			companyName: ['', Validators.required],
			portalName: ['', Validators.required],
			siteUrl: ['', Validators.required],
		});
		this.adminForm = this._formBuilder.group({
			firstName: ['', Validators.required],
			lastName: ['', Validators.required],
			middleName: ['', Validators.required],
			email: ['', Validators.required],
			login: ['', Validators.required],
			password: ['', Validators.required],
		});
		this.smtpForm = this._formBuilder.group({
			host: ['', Validators.required],
			port: ['', Validators.required],
			enableSSL: ['', Validators.required],
			email: ['', Validators.required],
			password: ['', Validators.required],
		});
	}

	submitForm() {
		console.log(this.companyForm.value, this.adminForm.value, this.smtpForm.value);
	}
}
