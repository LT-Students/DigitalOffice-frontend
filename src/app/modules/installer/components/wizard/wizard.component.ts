import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { CompanyApiService } from '@data/api/company-service/services/company-api.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
	isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
		const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
		const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

		return (invalidCtrl || invalidParent);
	}
}

@Component({
	selector: 'do-wizard',
	templateUrl: './wizard.component.html',
	styleUrls: ['./wizard.component.scss'],
})
export class WizardComponent implements OnInit {
	companyForm: FormGroup;
	adminForm: FormGroup;
	smtpForm: FormGroup;

	matcher = new MyErrorStateMatcher();

	hide = true;
	hidePassword = true;

	constructor(private _formBuilder: FormBuilder, private companyApiService: CompanyApiService, private router: Router, private titleService: Title) {
		this.titleService.setTitle('Installer');
	}

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
			confirmPassword: ['', Validators.required]
		}, { validator: this.checkPasswords });
		this.smtpForm = this._formBuilder.group({
			host: ['', Validators.required],
			port: ['', Validators.required],
			enableSsl: ['', Validators.required],
			email: ['', Validators.required],
			password: ['', Validators.required],
			confirmPassword: ['', Validators.required]
		}, { validator: this.checkPasswords });
	}

	checkPasswords (group: FormGroup) {
		let pass = group.get('password').value;
		let confirmPass = group.get('confirmPassword').value;

		return pass === confirmPass ? null : { notSame: true }
	}

	submitForm() {
		this.companyApiService
			.createCompany({
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
					smtpInfo: {
						host: this.smtpForm.get('host').value,
						port: this.smtpForm.get('port').value,
						email: this.smtpForm.get('email').value,
						password: this.smtpForm.get('password').value,
						enableSsl: this.smtpForm.get('enableSsl').value,
					},
				},
			})
			.subscribe(
				(result) => {
					this.router.navigate(['/auth/login']);
				},
				(error) => console.log(error)
			);
	}
}
