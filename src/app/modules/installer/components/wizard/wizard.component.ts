import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompanyApiService } from '@data/api/company-service/services/company-api.service';

@Component({
	selector: 'do-wizard',
	templateUrl: './wizard.component.html',
	styleUrls: ['./wizard.component.scss'],
})
export class WizardComponent implements OnInit {
	companyForm: FormGroup;
	adminForm: FormGroup;
	smtpForm: FormGroup;

	constructor(private _formBuilder: FormBuilder, private companyApiService: CompanyApiService) {}

	ngOnInit() {
		this.companyForm = this._formBuilder.group({
			companyName: ['', Validators.required],
			portalName: ['', Validators.required],
			siteUrl: ['', Validators.required],
		});
		this.adminForm = this._formBuilder.group({
			firstName: ['', Validators.required],
			lastName: ['', Validators.required],
			middleName: [''],
			email: ['', Validators.required],
			login: ['', Validators.required],
			password: ['', Validators.required],
		});
		this.smtpForm = this._formBuilder.group({
			host: ['', Validators.required],
			port: ['', Validators.required],
			enableSsl: ['', Validators.required],
			email: ['', Validators.required],
			password: ['', Validators.required],
		});
	}

	submitForm() {
		console.log(this.companyForm.value, this.adminForm.value, this.smtpForm.value);
		this.companyApiService.createCompany({
			body: {
				companyName: this.companyForm.get('companyName').value,
				portalName: this.companyForm.get('portalName').value,
				siteUrl: this.companyForm.get('siteUrl').value,
				adminInfo: {
					firstName: this.adminForm.get('firstName').value,
					lastName: this.adminForm.get('lastName').value,
					middleName: this.adminForm.get('middleName').value,
					email: this.adminForm.get('email').value,
					login: this.adminForm.get('login').value,
					password: this.adminForm.get('password').value,
				},
				sMTP: {
					host: this.smtpForm.get('host').value,
					port: this.smtpForm.get('port').value,
					email: this.smtpForm.get('email').value,
					password: this.smtpForm.get('password').value,
					enableSsl: this.smtpForm.get('enableSsl').value,
				}
			},
		});
	}
}
