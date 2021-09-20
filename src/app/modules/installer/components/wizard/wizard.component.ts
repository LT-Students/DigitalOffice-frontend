import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { CompanyApiService } from '@data/api/company-service/services/company-api.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
	selector: 'do-wizard',
	templateUrl: './wizard.component.html',
	styleUrls: ['./wizard.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WizardComponent implements OnInit {
	public companyForm: FormGroup;
	public adminForm: FormGroup;
	public smtpForm: FormGroup;

	constructor(private _formBuilder: FormBuilder, private _companyApiService: CompanyApiService, private router: Router, private titleService: Title) {
		this.titleService.setTitle('Installer');
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
			confirmPassword: ['', Validators.required],
		},
			{ validators: this.matchControls('password', 'confirmPassword') }
		);
		this.smtpForm = this._formBuilder.group({
			host: ['', Validators.required],
			port: ['', Validators.required],
			enableSsl: ['', Validators.required],
			email: ['', Validators.required],
			password: ['', Validators.required],
			confirmPassword: ['', Validators.required],
		},
			{ validators: this.matchControls('password', 'confirmPassword') }
		);

	}

	ngOnInit() {
	}

	public matchControls(field1: string | (string | number)[], field2: string | (string | number)[]): ValidatorFn | null  {
		return (group: AbstractControl): ValidationErrors | null => {
			const control1 = group.get(field1);
			const control2 = group.get(field2);
			return control1 &&
			control2 &&
			control1.value &&
			control2.value &&
			control1.value !== control2.value
				? { matchingPasswords: 'Пароль не совпадает' }
				: null;
		};
	}

	public submitForm(): void {
		this._companyApiService
			.createCompany({
				body: {
					companyName: this.companyForm.get('companyName')?.value,
					portalName: this.companyForm.get('portalName')?.value,
					siteUrl: this.companyForm.get('siteUrl')?.value,
					adminInfo: {
						firstName: this.adminForm.get('firstName')?.value,
						lastName: this.adminForm.get('lastName')?.value,
						middleName: this.adminForm.get('middleName')?.value,
						email: this.adminForm.get('email')?.value,
						login: this.adminForm.get('login')?.value,
						password: this.adminForm.get('password')?.value,
					},
					smtpInfo: {
						host: this.smtpForm.get('host')?.value,
						port: this.smtpForm.get('port')?.value,
						email: this.smtpForm.get('email')?.value,
						password: this.smtpForm.get('password')?.value,
						enableSsl: this.smtpForm.get('enableSsl')?.value,
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
